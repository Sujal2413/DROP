import clientPromise from '@/lib/mongodb';

export class B2BRepository {
  private static readonly collectionName = 'b2b_leads';

  static async getCollection() {
    const client = await clientPromise;
    return client.db('Drop').collection(this.collectionName);
  }

  static async addLead(lead: any) {
    const collection = await this.getCollection();
    return collection.insertOne(lead);
  }
}
