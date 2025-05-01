import { MongoClient, Db, MongoClientOptions } from 'mongodb';

/**
 * MongoDB URI loaded from environment variable.
 * Required for establishing connection to MongoDB Atlas or local MongoDB.
 */
const MONGODB_URI = process.env.MONGODB_URI || '';

/**
 * MongoDB Database name loaded from environment variable or fallback default.
 */
const MONGODB_DB = process.env.MONGODB_DB || 'foodhisattva';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * @interface MongoConnection
 * @description
 * Interface representing the structure of the returned MongoDB connection object.
 */
interface MongoConnection {
  client: MongoClient;
  db: Db;
}

// Cache for MongoClient and Db instance to prevent re-connecting on hot reloads
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Graceful shutdown handler for Node.js to close MongoDB connection on termination.
 */
if (typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    if (cachedClient) {
      await cachedClient.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  });
}

/**
 * Establishes a connection to the MongoDB database.
 * Uses cached connection if available to reduce overhead.
 *
 * @returns {Promise<MongoConnection>} - A promise that resolves to the MongoClient and database instance.
 * @throws {Error} - Throws if connection to MongoDB fails.
 *
 * @example
 * const { db } = await connectToDatabase();
 * const users = await db.collection('users').find().toArray();
 */
export async function connectToDatabase(): Promise<MongoConnection> {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // MongoDB connection options for performance and security
  const options: MongoClientOptions = {
    maxPoolSize: 10,
    minPoolSize: 5,
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development',
    retryWrites: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  };

  try {
    const client = new MongoClient(MONGODB_URI, options);
    await client.connect();

    // Ping MongoDB server to confirm connection is working
    await client.db(MONGODB_DB).command({ ping: 1 });
    console.log('Connected successfully to MongoDB server');

    const db = client.db(MONGODB_DB);

    // Cache for reuse
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}


 
