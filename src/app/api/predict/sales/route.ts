/**
 * app/api/sales/route.ts
 *
 * CRUD handlers for daily sales entries stored in `data/sales.csv`.
 * - GET    /api/sales    → return all sales as JSON
 * - POST   /api/sales    → append new sales rows
 * - PUT    /api/sales    → update an existing sale (date+item)
 * - DELETE /api/sales    → delete a sale (date+item)
 *
 * Uses Node’s fs/promises and NextResponse for standardized JSON replies
 * and HTTP status codes.
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';

const SALES_PATH = path.resolve('data/sales.csv');

/**
 * A single sale record.
 */
type Sale = {
  /** YYYY-MM-DD date string */
  date: string;
  /** Item name */
  item: string;
  /** Quantity sold */
  qty: number;
};

/**
 * Read and parse the sales CSV into an array of Sale objects.
 *
 * @returns {Promise<Sale[]>} Array of parsed sales.
 */
async function readSales(): Promise<Sale[]> {
  const content = await fs.readFile(SALES_PATH, 'utf-8');
  return content
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('date,'))
    .map((line) => {
      const [date, item, qty] = line.split(',');
      return { date, item, qty: Number(qty) };
    });
}

/**
 * Overwrite the CSV file with the provided sales array.
 *
 * @param {Sale[]} sales - Array of sales to write.
 */
async function writeSales(sales: Sale[]): Promise<void> {
  const header = 'date,item,qty\n';
  const csvLines = sales.map((s) => `${s.date},${s.item},${s.qty}`).join('\n');
  const finalContent = header + (csvLines ? csvLines + '\n' : '');
  await fs.writeFile(SALES_PATH, finalContent, 'utf-8');
}

/**
 * POST /api/sales
 *
 * Append an array of new sales. Creates the CSV if it doesn’t exist.
 *
 * @param {NextRequest} req - The incoming request carrying JSON Sale[].
 * @returns {Promise<NextResponse>} 200 on success or 400/500 on error.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const newSales: Sale[] = await req.json();
  if (!Array.isArray(newSales)) {
    return NextResponse.json({ error: 'Expected an array of sales' }, { status: 400 });
  }

  let existing = '';
  try {
    existing = await fs.readFile(SALES_PATH, 'utf-8');
  } catch {
    // File missing: create with header
    existing = 'date,item,qty\n';
    await fs.writeFile(SALES_PATH, existing, 'utf-8');
  }

  const needsNewline = existing.length > 0 && !existing.endsWith('\n');
  const lines = newSales.map((s) => `${s.date},${s.item},${s.qty}`).join('\n');
  const toAppend = `${needsNewline ? '\n' : ''}${lines}\n`;

  await fs.appendFile(SALES_PATH, toAppend, 'utf-8');
  return NextResponse.json({ status: 'added', count: newSales.length });
}

/**
 * GET /api/sales
 *
 * Return all parsed sales records.
 *
 * @returns {Promise<NextResponse>} JSON `{ sales: Sale[] }`.
 */
export async function GET(): Promise<NextResponse> {
  const sales = await readSales();
  return NextResponse.json({ sales });
}

/**
 * PUT /api/sales
 *
 * Update an existing sale matching date+item.
 *
 * @param {NextRequest} req - The request carrying a single Sale object.
 * @returns {Promise<NextResponse>} 200 on success, 404 if not found.
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const updated: Sale = await req.json();
  const sales = await readSales();

  const index = sales.findIndex((s) => s.date === updated.date && s.item === updated.item);
  if (index === -1) {
    return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
  }

  sales[index] = updated;
  await writeSales(sales);
  return NextResponse.json({ status: 'updated', sale: updated });
}

/**
 * DELETE /api/sales
 *
 * Delete a sale identified by date+item.
 *
 * @param {NextRequest} req - The request carrying JSON `{ date, item }`.
 * @returns {Promise<NextResponse>} 200 on success, 404 if not found.
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { date, item }: { date: string; item: string } = await req.json();
  const sales = await readSales();

  const filtered = sales.filter((s) => !(s.date === date && s.item === item));
  if (filtered.length === sales.length) {
    return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
  }

  await writeSales(filtered);
  return NextResponse.json({ status: 'deleted', date, item });
}
