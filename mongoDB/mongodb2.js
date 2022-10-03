import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {};
const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export const getData = async () => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const data = await db.collection('tasks').find({}).toArray();
    const images = await JSON.parse(JSON.stringify(data));
    console.log(images);
    return data;
  } catch (e) {
    console.error(e);
    return e?.message;
  }
};

export const uploadScreenshots = async (data, res) => {
  try {
    const client = await clientPromise;
    const db = await client.db();

    db.collection('images').insertOne(data);
    // res.status(200).json({ data, name: 'successfully connected to database' });
  } catch (err) {
    // res.status(500).json({ message: `err: ${err}` });
    console.error('error !!!!!!!', err);
  }
};

export const deleteAll = async data => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    db.collection('images').deleteMany({});
  } catch (err) {
    console.error('error !!!', err);
  }
};

// deleteAll();
