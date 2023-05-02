const { MongoClient } = require('mongodb');
// const url = 'mongodb://127.0.0.1:17020';
const url = 'mongodb://172.23.10.73:27017';

// const client = new MongoClient(url);
// await client.connect();
// //   console.log('Connected successfully to server');

exports.insertMany = async (db_input, collection_input, input) => {

  const client = new MongoClient(url);
  await client.connect();
  //   console.log('Connected successfully to server');
  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.insertMany(input);

  await client.close();

  return res;

};

exports.find = async (db_input, collection_input, input) => {

  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.find(input).limit(1000).sort({ "_id": -1 }).toArray();

  await client.close();

  return res;
};

exports.findsome = async (db_input, collection_input, input) => {

  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.find(input).limit(500).sort({ "_id": -1 }).project({"PO":1,"CP":1,"ALL_DONE":1}).toArray();

  await client.close();

  return res;
};

exports.update = async (db_input, collection_input, input1, input2) => {

  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.updateOne(input1, input2);
  //updateOne({ a: 3 }, { $set: { b: 1 } });

  await client.close();

  return res;
};

exports.findSAP = async (urls,db_input, collection_input, input) => {

  const client = new MongoClient(urls);
  await client.connect();

  const db = client.db(db_input);
  const collection = db.collection(collection_input);
  let res = await collection.find(input).limit(1000).sort({ "_id": -1 }).toArray();

  await client.close();

  return res;
};