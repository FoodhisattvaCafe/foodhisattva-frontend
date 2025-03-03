import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { validateMenuItem } from '@/models/MenuItem';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Fetch all menu items from the database
    const menuItems = await db.collection('menuItems').find({}).toArray();
    
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// POST route for adding new menu items (for admin use)
export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    
    // Parse the request body
    const menuItem = await request.json();
    
    // Validate the request body
    const validation = validateMenuItem(menuItem);
    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }
    
    // Insert the new menu item
    const result = await db.collection('menuItems').insertOne({
      ...menuItem,
      createdAt: new Date(),
    });
    
    return NextResponse.json(
      { 
        message: 'Menu item added successfully',
        id: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to add menu item' },
      { status: 500 }
    );
  }
}