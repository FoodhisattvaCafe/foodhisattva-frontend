import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'foodhisattva';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// Handle graceful shutdown
if (typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    if (cachedClient) {
      await cachedClient.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  });
}

export async function connectToDatabase(): Promise<MongoConnection> {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Configure connection options
  const options: MongoClientOptions = {
    maxPoolSize: 10,      // Maintain up to 10 socket connections
    minPoolSize: 5,       // Maintain at least 5 socket connections
    ssl: true,            // Use SSL for connection
    tls: true,            // Use TLS for connection
    tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development', // Only in development
    retryWrites: true,
    connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
    socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
  };

  try {
    // Create a new connection
    const client = new MongoClient(MONGODB_URI, options);
    await client.connect();
    
    // Test the connection
    await client.db(MONGODB_DB).command({ ping: 1 });
    console.log("Connected successfully to MongoDB server");
    
    const db = client.db(MONGODB_DB);
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    return { client, db };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}