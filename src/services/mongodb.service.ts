import { connectToDatabase } from '../lib/mongodb';
import { Collection, Document, Filter, FindOptions } from 'mongodb';

/**
 * @class MongoDBService
 * @classdesc
 * Provides static utility methods for performing CRUD operations on MongoDB collections
 * with built-in error handling and database connection management.
 */
export class MongoDBService {
  /**
   * Returns a MongoDB collection instance.
   *
   * @param {string} collectionName - The name of the collection to access.
   * @returns {Promise<Collection>} The MongoDB collection instance.
   * @throws {Error} If the collection cannot be accessed.
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
   * Finds multiple documents in a MongoDB collection.
   *
   * @template T - The document type.
   * @param {string} collectionName - The name of the collection.
   * @param {Filter<T>} [query={}] - MongoDB filter query.
   * @param {FindOptions} [options={}] - Options for find operation.
   * @returns {Promise<T[]>} An array of matching documents.
   * @throws {Error} If the query fails.
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
   * Finds a single document in a MongoDB collection.
   *
   * @template T - The document type.
   * @param {string} collectionName - The name of the collection.
   * @param {Filter<T>} query - Filter to locate the document.
   * @returns {Promise<T | null>} The matching document or null if not found.
   * @throws {Error} If the query fails.
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
   * Inserts a document into a MongoDB collection.
   *
   * @template T - The document type.
   * @param {string} collectionName - The name of the collection.
   * @param {T} document - The document to insert.
   * @returns {Promise<T>} The inserted document with _id field.
   * @throws {Error} If the insert fails.
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
   * Updates a document in a MongoDB collection.
   *
   * @template T - The document type.
   * @param {string} collectionName - The name of the collection.
   * @param {Filter<T>} query - Filter to locate the document.
   * @param {Partial<T>} update - Partial document with fields to update.
   * @returns {Promise<boolean>} True if a document was updated, else false.
   * @throws {Error} If the update fails.
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
   * Deletes a document from a MongoDB collection.
   *
   * @template T - The document type.
   * @param {string} collectionName - The name of the collection.
   * @param {Filter<T>} query - Filter to locate the document.
   * @returns {Promise<boolean>} True if a document was deleted, else false.
   * @throws {Error} If the delete fails.
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

  

