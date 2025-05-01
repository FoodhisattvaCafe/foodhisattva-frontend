/**
 * app/api/predict/route.ts
 *
 * POST /api/predict
 *
 * Reads the sales CSV and recipes JSON from disk, forwards them along with
 * a forecast horizon to an external Python prediction service, and returns
 * its JSON response, which must include `forecastedSales` and `inventoryNeeded`.
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

/**
 * POST /api/predict
 *
 * @param {NextRequest} req
 *   Incoming request. If `Content-Type: application/json`, its body should
 *   include `{ horizon?: string }`. Defaults `horizon` to `"7d"`.
 *
 * @returns {Promise<NextResponse>}
 *   - 200 + JSON `{ forecastedSales: object, inventoryNeeded: object }`
 *     on success,
 *   - 500 + `{ error: string }` if any step fails or the Python response
 *     is missing required keys.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const contentType = req.headers.get('content-type') || '';
    let sales_csv = '';
    let recipes_json: any[] = [];
    let horizon = '7d';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      horizon = body.horizon || '7d';

      const salesPath = path.resolve('data/sales.csv');
      const recipesPath = path.resolve('data/recipies.json');

      [sales_csv, recipes_json] = await Promise.all([
        fs.readFile(salesPath, 'utf-8'),
        fs.readFile(recipesPath, 'utf-8').then((d) => JSON.parse(d)),
      ]);
    }

    console.log('🚀 Sending to Python /predict:', {
      sales_csv: sales_csv.slice(0, 100), // preview
      recipes_json,
      horizon,
    });

    const pythonResponse = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sales_csv, recipes_json, horizon }),
    });
    const result = await pythonResponse.json();

    console.log('✅ Received from Python:', result);

    if (!result.forecastedSales || !result.inventoryNeeded) {
      console.error('Missing keys in result:', Object.keys(result));
      return NextResponse.json(
        { error: 'Missing forecastedSales or inventoryNeeded' },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('🛑 /api/predict crashed:', err.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
