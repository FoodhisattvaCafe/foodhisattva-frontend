/**
 * app/api/sales/route.ts
 *
 * REST API handler to append daily sales entries into `data/sales.csv`.
 * Each POST must send a JSON object `{ [item: string]: number }` representing
 * today’s sold quantities.  Only one line per item per day is recorded.
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';

// Absolute path to the CSV file storing sales records.
const SALES_PATH = path.resolve(process.cwd(), 'data/sales.csv');

/**
 * POST /api/sales
 *
 * Reads JSON `{ [item: string]: number }` from the request body, ensures
 * `data/sales.csv` exists with a `date,item,qty` header, then appends one
 * CSV row per unique item sold *today* (if qty > 0 and not already recorded).
 *
 * @param {NextRequest} req - The incoming Next.js request object.
 * @returns {Promise<NextResponse>} JSON with:
 *   - 200 + `{ status: 'success', added: N }` if new rows were appended
 *   - 200 + `{ status: 'duplicate', added: 0, message: 'No new unique sales for today' }`
 *     if nothing new to add
 *   - 500 + `{ error: 'Internal server error' }` on I/O or parse errors
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Format today’s date as YYYY-MM-DD
    const today = format(new Date(), 'yyyy-MM-dd');

    // Parse incoming JSON sales map
    const sales: Record<string, number> = await req.json();

    // Ensure the CSV file exists, create with header if missing
    let existing: string;
    try {
      existing = await fs.readFile(SALES_PATH, 'utf-8');
    } catch {
      await fs.writeFile(SALES_PATH, 'date,item,qty\n');
      existing = 'date,item,qty\n';
    }

    // Build a set of items already recorded for today
    const lines = existing.split('\n');
    const todayEntries = new Set(
      lines
        .filter((line) => line.startsWith(today))
        .map((line) => line.split(',')[1])
    );

    // For each item with qty>0 and not yet logged today, create a CSV row
    const rowsToAdd = Object.entries(sales)
      .filter(([item, qty]) => qty > 0 && !todayEntries.has(item))
      .map(([item, qty]) => `${today},${item},${qty}`);

    // Append and respond accordingly
    if (rowsToAdd.length > 0) {
      await fs.appendFile(SALES_PATH, rowsToAdd.join('\n') + '\n');
      return NextResponse.json({ status: 'success', added: rowsToAdd.length });
    } else {
      return NextResponse.json({
        status: 'duplicate',
        added: 0,
        message: 'No new unique sales for today'
      });
    }
  } catch (err: any) {
    console.error('Failed to add sales:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
