const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://jonaskaruzas:q4WHBC96LbuS@jonocluster.orzfywp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbName = "CryptoInfo";

const addSearch = async (curr) => {
  try {
    await client.connect();
    const myDB = client.db(dbName);
    const myColl = myDB.collection("Search");
    const doc = { value: curr };
    const result = await myColl.insertOne(doc);
  } finally {
    await client.close();
  }
};

const addSelect = async (curr) => {
  try {
    await client.connect();
    const myDB = client.db(dbName);
    const myColl = myDB.collection("Select");
    const doc = { value: curr };
    const result = await myColl.insertOne(doc);
  } finally {
    await client.close();
  }
};

module.exports = { addSearch, addSelect };
