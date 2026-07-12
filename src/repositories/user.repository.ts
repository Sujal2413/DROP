import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export class UserRepository {
  private static readonly collectionName = 'users';

  static async getCollection() {
    const client = await clientPromise;
    return client.db('Drop').collection(this.collectionName);
  }

  static async findByEmail(email: string) {
    const collection = await this.getCollection();
    return collection.findOne({ email });
  }

  static async createUser(user: any) {
    const collection = await this.getCollection();
    return collection.insertOne(user);
  }

  static async updateUser(id: string, updates: any) {
    const collection = await this.getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  }
}
