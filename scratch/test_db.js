const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/Drop';
const client = new MongoClient(uri);

async function test() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Successfully connected!');
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await client.close();
  }
}

test();
