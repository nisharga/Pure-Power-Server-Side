const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//mondodb_Clint start
const uri = `mongodb+srv://Nisharga:aDj8QSwONIMYsWtK@cluster0.qemdz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//mondodb_Clint end

app.get("/", (req, res) => {
  res.send("I Love Express");
});

app.listen(port, () => {
  console.log("port listen");
});

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("Pure-Power").collection("product");

    // product added on mongoDB
    app.post("/addproduct", async (req, res) => {
      const data = req.body;
      const result = await productCollection.insertOne(data);
      console.log(result, "product create on db");
    });
    // product added on mongoDB

    // product all prduct from mongoDB
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // product all prduct from mongoDB

    // product a prduct from mongoDB
    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = productCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // product a prduct from mongoDB
  } finally {
    //        await client.close()
  }
}
run().catch(console.dir);
