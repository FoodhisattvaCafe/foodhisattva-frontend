/**
 * app/api/menu/route.ts
 *
 * REST API handlers for the menu collection:
 *  - GET  /api/menu   → fetch all menu items (falls back to static data on DB error)
 *  - POST /api/menu   → validate and insert a new menu item
 *
 * Uses MongoDB via connectToDatabase, and falls back to `fallbackMenuItems`
 * if the database is unavailable.
 */

import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { validateMenuItem } from '../../../models/MenuItem';

/**
 * Static fallback menu items used when the database is unreachable.
 */
const fallbackMenuItems = [
  {
    id: '1',
    name: 'Spring Rolls',
    description: 'Fresh vegetables wrapped in rice paper',
    price: 8.99,
    image: '/images/menu/spring-rolls.jpg',
    category: 'Starters',
    dietary: ['Gluten Free', 'Vegan']
  },
  {
    id: '2',
    name: 'Buddha Bowl',
    description: 'Quinoa, roasted vegetables, avocado, and tahini dressing',
    price: 14.99,
    image: '/images/menu/buddha-bowl.jpg',
    category: 'Signature Bowls',
    dietary: ['Gluten Free', 'Vegan']
  },
  {
    id: '3',
    name: 'Pad Thai',
    description: 'Rice noodles with tofu, bean sprouts, and peanuts',
    price: 13.99,
    image: '/images/menu/pad-thai.jpg',
    category: 'Main Dishes',
    dietary: ['Vegan']
  },
  {
    id: '4',
    name: 'Mango Sticky Rice',
    description: 'Sweet sticky rice with fresh mango',
    price: 7.99,
    image: '/images/menu/mango-sticky-rice.jpg',
    category: 'Desserts',
    dietary: ['Gluten Free', 'Vegan']
  }
];

/**
 * GET /api/menu
 *
 * Fetches all menu items from MongoDB. If the database call fails,
 * returns a static fallback array.
 *
 * @returns {Promise<NextResponse>} JSON array of menu items (200 OK)
 */
export async function GET(): Promise<NextResponse> {
  console.log("GET request to /api/menu received");
  try {
    const { db } = await connectToDatabase();
    console.log("Database connected successfully");
    const menuItems = await db.collection('menuItems').find({}).toArray();
    console.log(`Found ${menuItems.length} menu items`);
    return NextResponse.json(menuItems);
  } catch (error: any) {
    console.error('Database Error:', error);
    console.log('Using fallback menu data due to database error');
    return NextResponse.json(fallbackMenuItems);
  }
}

/**
 * POST /api/menu
 *
 * Validates and inserts a new menu item into the database.
 *
 * @param {Request} request - Incoming Next.js request containing JSON body
 * @returns {Promise<NextResponse>}
 *   - 201 + `{ message, id }` on success
 *   - 400 + `{ message, errors }` if validation fails
 *   - 500 + `{ message }` on server error
 */
export async function POST(request: Request): Promise<NextResponse> {
  console.log("POST request to /api/menu received");
  try {
    const { db } = await connectToDatabase();
    const menuItem = await request.json();
    console.log("Received menu item:", menuItem);

    // Validate the menu item payload
    const validation = validateMenuItem(menuItem);
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
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
    console.log("Menu item added with ID:", result.insertedId);

    return NextResponse.json(
      { message: 'Menu item added successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to add menu item' },
      { status: 500 }
    );
  }
}
