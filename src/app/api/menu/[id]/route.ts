import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { validateMenuItem } from '@/models/MenuItem';

// GET a single menu item by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    
    // Find the menu item
    const menuItem = await db.collection('menuItems').findOne({
      _id: new ObjectId(id)
    });
    
    if (!menuItem) {
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(menuItem);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch menu item' },
      { status: 500 }
    );
  }
}

// PUT/UPDATE a menu item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const menuItem = await request.json();
    
    // Validate the menu item
    const validation = validateMenuItem(menuItem);
    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }
    
    // Update the menu item
    const result = await db.collection('menuItems').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...menuItem,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Menu item updated successfully'
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

// DELETE a menu item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    
    // Delete the menu item
    const result = await db.collection('menuItems').deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}