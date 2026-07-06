const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
console.log('URI from Next.js env parser:', uri.replace(/:([^:@]{8,})@/, ':****@'));

async function test() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connection OK');
    await client.db().collection('users').findOne({});
    console.log('Query OK');
  } catch (err) {
    console.error('Mongo Error:', err.message);
  } finally {
    await client.close();
  }
}
test();
