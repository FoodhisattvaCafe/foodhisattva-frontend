// This script seeds the MongoDB database with initial menu items
// Run with: node scripts/seed-menu.js

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'foodhisattva';

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample menu items
const menuItems = [
  {
    name: "Crispy Tofu Skewers",
    description: "Marinated tofu skewers with a sweet and savory glaze, topped with toasted sesame seeds.",
    price: 9.95,
    category: "Starters",
    image: "/images/food-1.png",
    keyIngredients: ["tofu", "sesame", "soy glaze"],
    dietaryTags: ["gluten_free", "soy_free"],
    featured: true,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Buddha's Delight Salad",
    description: "Fresh mixed greens with seasonal vegetables, edamame, and a ginger-sesame dressing.",
    price: 11.50,
    category: "Starters",
    image: "/images/food-2.png",
    keyIngredients: ["mixed greens", "edamame", "ginger", "sesame"],
    dietaryTags: ["gluten_free", "nut_free"],
    featured: false,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Spicy Szechuan Braised Tofu",
    description: "Silken tofu braised in a spicy Szechuan sauce with shiitake mushrooms and scallions.",
    price: 16.95,
    category: "Main Dishes",
    image: "/images/food-3.png",
    keyIngredients: ["silken tofu", "szechuan pepper", "shiitake", "scallions"],
    dietaryTags: ["spicy", "soy_free"],
    featured: true,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Grilled Teriyaki Tempeh",
    description: "Organic tempeh grilled with house-made teriyaki sauce, served with jasmine rice and steamed vegetables.",
    price: 17.50,
    category: "Main Dishes",
    image: "/images/food-4.png",
    keyIngredients: ["tempeh", "teriyaki", "jasmine rice", "seasonal vegetables"],
    dietaryTags: ["nut_free"],
    featured: false,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Enlightenment Bowl",
    description: "Brown rice topped with roasted sweet potatoes, avocado, edamame, pickled vegetables, and tahini dressing.",
    price: 12.95,
    category: "Signature Bowls",
    image: "/images/food-5.png",
    keyIngredients: ["brown rice", "sweet potato", "avocado", "edamame", "tahini"],
    dietaryTags: ["gluten_free"],
    featured: true,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Green Tea Matcha Cheesecake",
    description: "Creamy plant-based cheesecake infused with ceremonial grade matcha, on an almond crust.",
    price: 8.50,
    category: "Desserts",
    image: "/images/story-1.png",
    keyIngredients: ["cashews", "coconut cream", "matcha", "almonds"],
    dietaryTags: ["gluten_free"],
    featured: false,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Hibiscus & Ginger Refresher",
    description: "Housemade hibiscus tea with fresh ginger, lemon, and a touch of agave. Served chilled.",
    price: 4.95,
    category: "Drinks",
    image: "/images/story-2.png",
    keyIngredients: ["hibiscus", "ginger", "lemon", "agave"],
    dietaryTags: ["gluten_free", "soy_free", "nut_free"],
    featured: false,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  let client;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    
    // Check if collection exists and has data
    const collections = await db.listCollections({ name: 'menuItems' }).toArray();
    
    if (collections.length > 0) {
      const count = await db.collection('menuItems').countDocuments();
      if (count > 0) {
        console.log(`The menuItems collection already has ${count} documents.`);
        const proceed = await promptUser('Do you want to clear existing data and reseed? (y/n): ');
        
        if (proceed.toLowerCase() !== 'y') {
          console.log('Seeding cancelled.');
          return;
        }
        
        // Clear existing data
        await db.collection('menuItems').deleteMany({});
        console.log('Existing menu items deleted.');
      }
    }
    
    // Insert new data
    const result = await db.collection('menuItems').insertMany(menuItems);
    console.log(`${result.insertedCount} menu items successfully seeded.`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed.');
    }
  }
}

// Simple function to prompt user for input
function promptUser(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    readline.question(question, answer => {
      readline.close();
      resolve(answer);
    });
  });
}

// Run the seeding function
seedDatabase();