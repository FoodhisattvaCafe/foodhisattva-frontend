/**
 * app/api/defaults/route.ts
 *
 * Provides default data for the client:
 *  - `recipes_json`: parsed array from data/recipes.json
 *  - `sales_csv`: raw CSV text from data/sales.csv
 *
 * Exports a single GET handler that reads both files in parallel
 * and returns them in one JSON payload.
 */

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

/**
 * GET /api/defaults
 *
 * Read and return the contents of the recipes JSON and sales CSV.
 *
 * @returns {Promise<NextResponse>} On success, returns
 *   200 + `{ recipes_json: any[], sales_csv: string }`;  
 *   On failure, returns 500 + `{ error: "Failed to load defaults" }`.
 */
export async function GET(): Promise<NextResponse> {
  const salesPath = path.resolve("data/sales.csv");
  const recipesPath = path.resolve("data/recipes.json");

  try {
    // Read both files concurrently
    const [salesRaw, recipesRaw] = await Promise.all([
      fs.readFile(salesPath, "utf-8"),
      fs.readFile(recipesPath, "utf-8"),
    ]);

    // Parse JSON and trim CSV
    const recipes_json = JSON.parse(recipesRaw);
    const sales_csv = salesRaw.trim();

    // Return combined data
    return NextResponse.json({ recipes_json, sales_csv });
  } catch (err: any) {
    console.error("Failed to load defaults:", err);
    return NextResponse.json(
      { error: "Failed to load defaults" },
      { status: 500 }
    );
  }
}
