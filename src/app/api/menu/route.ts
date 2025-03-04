import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { validateMenuItem } from '../../../models/MenuItem';

// Add console logs for debugging
console.log("Loading menu API route");

// Fallback menu items to use when database connection fails
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

export async function GET() {
  console.log("GET request to /api/menu received");
  try {
    const { db } = await connectToDatabase();
    console.log("Database connected successfully");
    
    // Fetch all menu items from the database
    const menuItems = await db.collection('menuItems').find({}).toArray();
    console.log(`Found ${menuItems.length} menu items`);
    
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Database Error:', error);
    console.log('Using fallback menu data due to database error');
    
    // Return fallback data instead of an error response
    return NextResponse.json(fallbackMenuItems);
  }
}

// POST route for adding new menu items (for admin use)
export async function POST(request: Request) {
  console.log("POST request to /api/menu received");
  try {
    const { db } = await connectToDatabase();
    
    // Parse the request body
    const menuItem = await request.json();
    console.log("Received menu item:", menuItem);
    
    // Validate the request body
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