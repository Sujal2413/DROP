import clientPromise from '@/lib/mongodb';
import type { Document } from 'mongodb';

export class OrderRepository {
  private static readonly collectionName = 'orders';

  static async getCollection() {
    const client = await clientPromise;
    return client.db('Drop').collection(this.collectionName);
  }

  static async createOrder(order: Document) {
    const collection = await this.getCollection();
    return collection.insertOne(order);
  }
}
