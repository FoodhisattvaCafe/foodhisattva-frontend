import { connectToDatabase } from '../lib/mongodb';
import { Collection, Document, Filter, FindOptions } from 'mongodb';

/**
 * Service class to handle MongoDB operations with error handling and retries
 */
export class MongoDBService {
  /**
   * Get a MongoDB collection with error handling
   */
  static async getCollection(collectionName: string): Promise<Collection> {
    try {
      const { db } = await connectToDatabase();
      return db.collection(collectionName);
    } catch (error) {
      console.error(`Error accessing collection ${collectionName}:`, error);
      throw new Error(`Failed to access collection: ${collectionName}`);
    }
  }

  /**
   * Find documents in a collection
   */
  static async findDocuments<T extends Document>(
    collectionName: string, 
    query: Filter<T> = {}, 
    options: FindOptions = {}
  ): Promise<T[]> {
    try {
      const collection = await this.getCollection(collectionName);
      return await collection.find(query, options).toArray() as T[];
    } catch (error) {
      console.error(`Error finding documents in ${collectionName}:`, error);
      throw new Error(`Failed to find documents in collection: ${collectionName}`);
    }
  }

  /**
   * Find a single document in a collection
   */
  static async findDocument<T extends Document>(
    collectionName: string,
    query: Filter<T>
  ): Promise<T | null> {
    try {
      const collection = await this.getCollection(collectionName);
      return await collection.findOne(query) as T | null;
    } catch (error) {
      console.error(`Error finding document in ${collectionName}:`, error);
      throw new Error(`Failed to find document in collection: ${collectionName}`);
    }
  }

  /**
   * Insert a document into a collection
   */
  static async insertDocument<T extends Document>(
    collectionName: string,
    document: T
  ): Promise<T> {
    try {
      const collection = await this.getCollection(collectionName);
      const result = await collection.insertOne(document);
      return { ...document, _id: result.insertedId };
    } catch (error) {
      console.error(`Error inserting document into ${collectionName}:`, error);
      throw new Error(`Failed to insert document into collection: ${collectionName}`);
    }
  }

  /**
   * Update a document in a collection
   */
  static async updateDocument<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    update: Partial<T>
  ): Promise<boolean> {
    try {
      const collection = await this.getCollection(collectionName);
      const result = await collection.updateOne(query, { $set: update });
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw new Error(`Failed to update document in collection: ${collectionName}`);
    }
  }

  /**
   * Delete a document from a collection
   */
  static async deleteDocument<T extends Document>(
    collectionName: string,
    query: Filter<T>
  ): Promise<boolean> {
    try {
      const collection = await this.getCollection(collectionName);
      const result = await collection.deleteOne(query);
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      throw new Error(`Failed to delete document from collection: ${collectionName}`);
    }
  }
}