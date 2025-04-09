import { NextResponse } from "next/server"; import path from "path"; import fs from "fs/promises";

export async function GET() { const salesPath = path.resolve("data/sales.csv"); const recipesPath = path.resolve("data/recipes.json");

try { const [salesRaw, recipesRaw] = await Promise.all([ fs.readFile(salesPath, "utf-8"), fs.readFile(recipesPath, "utf-8"), ]);


const recipes_json = JSON.parse(recipesRaw);
const sales_csv = salesRaw.trim();

return NextResponse.json({ recipes_json, sales_csv });
} catch (err) { console.error(" Failed to load defaults:", err); return NextResponse.json({ error: "Failed to load defaults" }, { status: 500 }); } }