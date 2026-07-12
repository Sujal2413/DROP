import clientPromise from '@/lib/mongodb';

export class WaitlistRepository {
  private static readonly collectionName = 'waitlist';

  static async getCollection() {
    const client = await clientPromise;
    return client.db('Drop').collection(this.collectionName);
  }

  static async findByEmail(email: string) {
    const collection = await this.getCollection();
    return collection.findOne({ email });
  }

  static async addEntry(entry: any) {
    const collection = await this.getCollection();
    return collection.insertOne(entry);
  }
}
