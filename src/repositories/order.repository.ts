import clientPromise from '@/lib/mongodb';

export class OrderRepository {
  private static readonly collectionName = 'orders';

  static async getCollection() {
    const client = await clientPromise;
    return client.db('Drop').collection(this.collectionName);
  }

  static async createOrder(order: any) {
    const collection = await this.getCollection();
    return collection.insertOne(order);
  }
}
