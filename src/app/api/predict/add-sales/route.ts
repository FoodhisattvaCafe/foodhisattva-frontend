import { NextRequest, NextResponse } from 'next/server'; import fs from 'fs/promises'; import path from 'path'; import { format } from 'date-fns';

const SALES_PATH = path.resolve(process.cwd(), 'data/sales.csv');

export async function POST(req: NextRequest) { try { const today = format(new Date(), 'yyyy-MM-dd'); const sales: Record<string, number> = await req.json();

let existing: string = '';
try {
  existing = await fs.readFile(SALES_PATH, 'utf-8');
} catch {
  await fs.writeFile(SALES_PATH, 'date,item,qty\n');
  existing = 'date,item,qty\n';
}

const lines = existing.split('\n');
const todayEntries = new Set(
  lines.filter((line) => line.startsWith(today)).map((line) => line.split(',')[1])
);

const rowsToAdd = Object.entries(sales)
  .filter(([item, qty]) => qty > 0 && !todayEntries.has(item))
  .map(([item, qty]) => `${today},${item},${qty}`);

if (rowsToAdd.length > 0) {
  await fs.appendFile(SALES_PATH, rowsToAdd.join('\n') + '\n');
  return NextResponse.json({ status: 'success', added: rowsToAdd.length });
} else {
  return NextResponse.json({ status: 'duplicate', added: 0, message: 'No new unique sales for today' });
}
} catch (err: any) { console.error('Failed to add sales:', err); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }); } }