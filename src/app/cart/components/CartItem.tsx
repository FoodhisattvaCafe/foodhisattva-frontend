/**
 * app/api/menu/[id]/route.ts
 *
 * REST API handlers for a single MenuItem resource:
 *   - GET    /api/menu/:id    → fetch one menu item by ID
 *   - PUT    /api/menu/:id    → validate & update a menu item
 *   - DELETE /api/menu/:id    → remove a menu item by ID
 *
 * Uses MongoDB for persistence and NextResponse for JSON + status codes.
 */

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../lib/mongodb';
import { validateMenuItem } from '../../../../models/MenuItem';

/**
 * GET /api/menu/[id]
 *
 * Fetch the menu item with the given `id`.
 *
 * @param {Request} request - The incoming Next.js request object.
 * @param {{ params: { id: string } }} context - The dynamic route params.
 * @param {string} context.params.id - The MongoDB ObjectId of the menu item.
 * @returns {Promise<NextResponse>} A JSON response with:
 *   - 200 + menu item if found
 *   - 400 if `id` is invalid
 *   - 404 if not found
 *   - 500 on a database error
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  console.log("GET request to /api/menu/[id] received, id:", params.id);
  try {
    const id = params.id;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      console.log("Invalid ID format:", id);
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
      console.log("Menu item not found with ID:", id);
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

/**
 * PUT /api/menu/[id]
 *
 * Validate and update the menu item with the given `id`.
 *
 * @param {Request} request - The incoming Next.js request; JSON body expected.
 * @param {{ params: { id: string } }} context - The dynamic route params.
 * @param {string} context.params.id - The MongoDB ObjectId of the menu item.
 * @returns {Promise<NextResponse>} A JSON response with:
 *   - 200 + success message if updated
 *   - 400 if `id` is invalid or validation fails
 *   - 404 if the item does not exist
 *   - 500 on a database error
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  console.log("PUT request to /api/menu/[id] received, id:", params.id);
  try {
    const id = params.id;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      console.log("Invalid ID format:", id);
      return NextResponse.json(
        { message: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const menuItem = await request.json();

    // Validate the menu item payload
    const validation = validateMenuItem(menuItem);
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
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
      console.log("Menu item not found for update with ID:", id);
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      );
    }

    console.log("Menu item updated successfully, ID:", id);
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

/**
 * DELETE /api/menu/[id]
 *
 * Delete the menu item with the given `id`.
 *
 * @param {Request} request - The incoming Next.js request object.
 * @param {{ params: { id: string } }} context - The dynamic route params.
 * @param {string} context.params.id - The MongoDB ObjectId of the menu item.
 * @returns {Promise<NextResponse>} A JSON response with:
 *   - 200 + success message if deleted
 *   - 400 if `id` is invalid
 *   - 404 if the item does not exist
 *   - 500 on a database error
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  console.log("DELETE request to /api/menu/[id] received, id:", params.id);
  try {
    const id = params.id;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      console.log("Invalid ID format:", id);
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
      console.log("Menu item not found for deletion with ID:", id);
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      );
    }

    console.log("Menu item deleted successfully, ID:", id);
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
