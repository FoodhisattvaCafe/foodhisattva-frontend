import { NextRequest, NextResponse } from 'next/server'; import path from 'path'; import fs from 'fs/promises';

const RECIPES_PATH = path.resolve(process.cwd(), 'data/recipes.json');

export async function POST(req: NextRequest) { try { const body = await req.json(); const { item, ingredients } = body;

if (!item || !ingredients || typeof ingredients !== 'object') {
  return NextResponse.json({ error: 'Invalid recipe format' }, { status: 400 });
}

// Load existing recipes
const content = await fs.readFile(RECIPES_PATH, 'utf-8');
const recipes = JSON.parse(content);

const exists = recipes.some((r: any) => r.item.toLowerCase() === item.toLowerCase());
if (exists) {
  return NextResponse.json({ error: 'Recipe already exists' }, { status: 409 });
}

recipes.push({ item, ingredients });

await fs.writeFile(RECIPES_PATH, JSON.stringify(recipes, null, 2));
return NextResponse.json({ message: 'Recipe added successfully' });
} catch (err: any) { console.error('Error adding recipe:', err.message); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }); } }