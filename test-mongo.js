require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function test() {
  const uri = "mongodb+srv://sujalpatil0504:Sujal05042006@cluster0.hjnxlih.mongodb.net/Drop?appName=Cluster0";
  console.log('Testing connection to:', uri.replace(/:([^:@]{8,})@/, ':****@'));
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
  } catch (error) {
    console.error('Connection error:', error.message);
  } finally {
    await client.close();
  }
}

test();
