
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const RECIPE_PATH = path.resolve('data/recipies.json');

// GET all recipes
export async function GET() {
  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

// POST new recipe
export async function POST(req: NextRequest) {
  const newRecipe = await req.json();
  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  const recipes = JSON.parse(data);

  const exists = recipes.some((r: any) => r.item === newRecipe.item);
  if (exists) {
    return NextResponse.json({ error: "Recipe already exists." }, { status: 400 });
  }

  recipes.push(newRecipe);
  await fs.writeFile(RECIPE_PATH, JSON.stringify(recipes, null, 2));
  return NextResponse.json({ status: 'added', item: newRecipe.item });
}

// PUT to update recipe
export async function PUT(req: NextRequest) {
  const updatedRecipe = await req.json();
  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  const recipes = JSON.parse(data);

  const index = recipes.findIndex((r: any) => r.item === updatedRecipe.item);
  if (index === -1) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  recipes[index] = updatedRecipe;
  await fs.writeFile(RECIPE_PATH, JSON.stringify(recipes, null, 2));
  return NextResponse.json({ status: 'updated', item: updatedRecipe.item });
}

// DELETE a recipe
export async function DELETE(req: NextRequest) {
  const { item } = await req.json();
  if (!item) {
    return NextResponse.json({ error: 'Item is required' }, { status: 400 });
  }

  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  const recipes = JSON.parse(data);
  const filtered = recipes.filter((r: any) => r.item !== item);

  if (filtered.length === recipes.length) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  await fs.writeFile(RECIPE_PATH, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ status: 'deleted', item });
}
