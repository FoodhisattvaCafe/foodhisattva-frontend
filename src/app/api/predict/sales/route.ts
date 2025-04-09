import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const SALES_PATH = path.resolve('data/sales.csv');

type Sale = { date: string; item: string; qty: number };

async function readSales(): Promise<Sale[]> {
    const content = await fs.readFile(SALES_PATH, 'utf-8');
    return content
      .split('\n')
      .filter((line) => line.trim() && !line.startsWith("date"))
      .map((line) => {
        const [date, item, qty] = line.split(',');
        return { date, item, qty: Number(qty) };
      });
  }
  

async function writeSales(sales: Sale[]) {
    const header = "date,item,qty\n";
    const csvLines = sales.map((s) => `${s.date},${s.item},${s.qty}`).join("\n");
    const finalContent = header + csvLines + (csvLines ? "\n" : ""); // new line at the end if there's content trying to add fixing the same line bug
  
    await fs.writeFile(SALES_PATH, finalContent, "utf-8");
  }
  
export async function POST(req: NextRequest) {
    const newSales: Sale[] = await req.json();
  
    if (!Array.isArray(newSales)) {
      return NextResponse.json({ error: "Expected an array of sales" }, { status: 400 });
    }
  
    let fileExists = true;
    let existing = "";
  
    try {
      existing = await fs.readFile(SALES_PATH, "utf-8");
    } catch {
      fileExists = false;
      console.warn("⚠️ sales.csv not found, creating new with header");
      existing = "date,item,qty\n";
      await fs.writeFile(SALES_PATH, existing, "utf-8");
    }
  
    const needsNewline = existing.length > 0 && !existing.endsWith("\n");
    const lines = newSales.map((s) => `${s.date},${s.item},${s.qty}`).join("\n");
    const toAppend = `${needsNewline ? "\n" : ""}${lines}\n`;
  
    await fs.appendFile(SALES_PATH, toAppend, "utf-8");
  
    return NextResponse.json({ status: "added", count: newSales.length });
  }
  
  
// GET all sales
export async function GET() {
  const sales = await readSales();
  return NextResponse.json({ sales });
}

// PUT to update existing sale (same date + item)
export async function PUT(req: NextRequest) {
  const updated = await req.json();
  const sales = await readSales();

  const index = sales.findIndex((s) => s.date === updated.date && s.item === updated.item);
  if (index === -1) {
    return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
  }

  sales[index] = updated;
  await writeSales(sales);
  return NextResponse.json({ status: 'updated', sale: updated });
}


// DELETE a sale by date + item
export async function DELETE(req: NextRequest) {
    const { date, item } = await req.json();
    const sales = await readSales();
  
    const filtered = sales.filter((s) => !(s.date === date && s.item === item));
  
    if (filtered.length === sales.length) {
      return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
    }
  
    if (filtered.length === 0) {
        await fs.writeFile(SALES_PATH, "date,item,qty\n", "utf-8");
      } else {
        await writeSales(filtered);
      }
      
  
    return NextResponse.json({ status: 'deleted', date, item });
  }
  
