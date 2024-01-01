import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('testdata');
    const products = database.collection('products');

    // Query for a movie that has the title 'Back to the Future'
    const query = { _id: 1 };
    const product = await products.findOne(query);

    console.log(product);

    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function insert() { 
  try {
    const database = client.db('testdata');
    const products = database.collection('products');

    const doc = { _id: 3, name: "round", price: 1.5 };
    const result = await products.insertOne(doc);
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
insert().catch(console.dir);