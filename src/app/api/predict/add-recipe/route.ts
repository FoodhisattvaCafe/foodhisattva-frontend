/**
 * app/api/recipes/route.ts
 *
 * REST API handler for adding a new recipe.
 * Reads/writes `data/recipes.json` on disk.
 */

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Absolute path to the JSON file holding all recipes.
const RECIPES_PATH = path.resolve(process.cwd(), 'data/recipes.json');

/**
 * POST /api/recipes
 *
 * Accepts a JSON body `{ item: string, ingredients: Record<string,string> }`,
 * validates its shape, and appends it to `recipes.json` if not already present.
 *
 * @param {NextRequest} req      The incoming Next.js request object.
 * @returns {Promise<NextResponse>} A JSON response with:
 *   - 200 + `{ message: 'Recipe added successfully' }` on success
 *   - 400 + `{ error: 'Invalid recipe format' }` if payload missing fields
 *   - 409 + `{ error: 'Recipe already exists' }` on duplicate
 *   - 500 + `{ error: 'Internal server error' }` on any other failure
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { item, ingredients } = body;

    // Basic shape validation
    if (!item || !ingredients || typeof ingredients !== 'object') {
      return NextResponse.json(
        { error: 'Invalid recipe format' },
        { status: 400 }
      );
    }

    // Load existing recipes from disk
    const content = await fs.readFile(RECIPES_PATH, 'utf-8');
    const recipes = JSON.parse(content) as Array<{ item: string; ingredients: any }>;

    // Check for duplicates
    const exists = recipes.some(
      (r) => r.item.toLowerCase() === item.toLowerCase()
    );
    if (exists) {
      return NextResponse.json(
        { error: 'Recipe already exists' },
        { status: 409 }
      );
    }

    // Append and save
    recipes.push({ item, ingredients });
    await fs.writeFile(RECIPES_PATH, JSON.stringify(recipes, null, 2));

    return NextResponse.json({ message: 'Recipe added successfully' });
  } catch (err: any) {
    console.error('Error adding recipe:', err.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
