/**
 * app/api/recipes/route.ts
 *
 * CRUD handlers for the recipes collection stored in `data/recipies.json`.
 *  - GET    /api/recipes   → return all recipes
 *  - POST   /api/recipes   → add a new recipe
 *  - PUT    /api/recipes   → update an existing recipe
 *  - DELETE /api/recipes   → remove a recipe by item name
 *
 * Uses Node’s fs/promises to read/write the JSON file and NextResponse
 * to return standardized JSON responses with HTTP status codes.
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Absolute path to the JSON file of recipes
const RECIPE_PATH = path.resolve('data/recipies.json');

/**
 * GET /api/recipes
 *
 * Read and return all recipes from the JSON file.
 *
 * @returns {Promise<NextResponse>} 200 + array of recipe objects
 */
export async function GET(): Promise<NextResponse> {
  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  const recipes = JSON.parse(data);
  return NextResponse.json(recipes);
}

/**
 * POST /api/recipes
 *
 * Add a new recipe to the JSON file if it doesn’t already exist.
 *
 * @param {NextRequest} req   The incoming request containing JSON `{ item, ingredients }`
 * @returns {Promise<NextResponse>}
 *   - 200 + `{ status: 'added', item }` on success
 *   - 400 + `{ error: 'Recipe already exists.' }` if duplicate
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const newRecipe = await req.json();
  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  const recipes: any[] = JSON.parse(data);

  const exists = recipes.some((r) => r.item === newRecipe.item);
  if (exists) {
    return NextResponse.json(
      { error: 'Recipe already exists.' },
      { status: 400 }
    );
  }

  recipes.push(newRecipe);
  await fs.writeFile(RECIPE_PATH, JSON.stringify(recipes, null, 2));
  return NextResponse.json({ status: 'added', item: newRecipe.item });
}

/**
 * PUT /api/recipes
 *
 * Update an existing recipe in the JSON file.
 *
 * @param {NextRequest} req   The incoming request containing JSON `{ item, ingredients }`
 * @returns {Promise<NextResponse>}
 *   - 200 + `{ status: 'updated', item }` on success
 *   - 404 + `{ error: 'Recipe not found' }` if no match
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const updatedRecipe = await req.json();
  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  const recipes: any[] = JSON.parse(data);

  const index = recipes.findIndex((r) => r.item === updatedRecipe.item);
  if (index === -1) {
    return NextResponse.json(
      { error: 'Recipe not found' },
      { status: 404 }
    );
  }

  recipes[index] = updatedRecipe;
  await fs.writeFile(RECIPE_PATH, JSON.stringify(recipes, null, 2));
  return NextResponse.json({ status: 'updated', item: updatedRecipe.item });
}

/**
 * DELETE /api/recipes
 *
 * Remove a recipe by its `item` field.
 *
 * @param {NextRequest} req   The incoming request containing JSON `{ item }`
 * @returns {Promise<NextResponse>}
 *   - 200 + `{ status: 'deleted', item }` on success
 *   - 400 + `{ error: 'Item is required' }` if missing
 *   - 404 + `{ error: 'Item not found' }` if no match
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { item } = await req.json();
  if (!item) {
    return NextResponse.json(
      { error: 'Item is required' },
      { status: 400 }
    );
  }

  const data = await fs.readFile(RECIPE_PATH, 'utf-8');
  const recipes: any[] = JSON.parse(data);
  const filtered = recipes.filter((r) => r.item !== item);

  if (filtered.length === recipes.length) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    );
  }

  await fs.writeFile(RECIPE_PATH, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ status: 'deleted', item });
}
