import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

export const dbConnect = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await createListing(client, {
      hello: 'text',
    });
    // await listDatabases(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

//! insert

const createListing = async (client, newListing) => {
  const result = await client
    .db('sample_airbnb')
    .collection('some collection')
    .insertOne(newListing);
};

//! insert

const listDatabases = async client => {
  const databasesList = await client.db().admin().listDatabases();
  console.log('Databases:');
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
};

dbConnect().catch(console.error);

// console.log(uri);
// console.log(random);
