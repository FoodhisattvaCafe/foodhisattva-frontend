
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let sales_csv = "";
    let recipes_json: any[] = [];
    let horizon = "7d";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      horizon = body.horizon || "7d";

      const salesPath = path.resolve("data/sales.csv");
      const recipesPath = path.resolve("data/recipies.json");

      [sales_csv, recipes_json] = await Promise.all([
        fs.readFile(salesPath, "utf-8"),
        fs.readFile(recipesPath, "utf-8").then((d) => JSON.parse(d)),
      ]);
    }
    console.log(" Sending request to Python:", {
      sales_csv: sales_csv.slice(0, 100), // print first 100 chars
      recipes_json,
      horizon,
    });
    
    const pythonResponse = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sales_csv, recipes_json, horizon }),
    });

    const result = await pythonResponse.json();

    console.log("✅ Python /predict returned:", result);

    if (!result.forecastedSales || !result.inventoryNeeded) {
      console.error("Missing keys in result:", Object.keys(result));
      return NextResponse.json(
        { error: "Missing forecastedSales or inventoryNeeded from model" },
        { status: 500 }
      );
    }

    return NextResponse.json(result);

  } catch (err: any) {
    console.error("API /api/predict crashed:", err.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

  