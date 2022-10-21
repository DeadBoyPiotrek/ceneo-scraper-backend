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
    const images = await JSON.parse(JSON.stringify(data));
    console.log(images);
    return data;
  } catch (e) {
    console.error(e);
    return e?.message;
  }
};
export const deleteData = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    db.collection('images').deleteMany({});
    res.send('delete all');
  } catch (err) {
    console.error('error !!!', err);
  }
};

export const uploadData = async (data, product) => {
  try {
    const client = await clientPromise;
    const db = await client.db();

    db.collection(product).insertOne({ data, date: new Date() });
    // res.status(200).json({ data, name: 'successfully connected to database' });
  } catch (err) {
    // res.status(500).json({ message: `err: ${err}` });
    console.error('error !!!!!!!', err);
  }
};

export const replaceData = async (data, product) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    db.collection(product).replaceOne({}, { data, date: new Date() });
  } catch (err) {
    console.error('error !!!', err);
  }
};
