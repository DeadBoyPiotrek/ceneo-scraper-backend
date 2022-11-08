import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {};
const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export const downloadData = async () => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const data = await db.collection('tasks').find({}).toArray();

    return data;
  } catch (e) {
    console.error(e);
    return e?.message;
  }
};
export const deleteData = async product => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    await db.collection(product).deleteMany({});
    await db.collection(product).drop();
  } catch (err) {
    console.error('error !!! in deleteData', err);
    return err;
  }
};

export const replaceData = async (data, product) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const num = await db.collection(product).count();

    if (num === 0) {
      await db.collection(product).insertOne({ data, date: new Date() });
    } else {
      await db.collection(product).replaceOne({}, { data, date: new Date() });
    }
  } catch (err) {
    console.error('error !!!', err);
  }
};
