const express= require('express');
const fs= require('fs');
const bodyParser= require('body-parser');
const app= express();
const cors= require('cors');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://nazmussaqib:nazmussaqib@myportfoliocontactus.tkbdv8l.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("portfolio").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
}
}
run().catch(console.dir);

async function insertData(data) {
    try {
        const db = client.db("portfolio");
        const collection = db.collection("contactMe");
        let data_formatted={
            "name": data.name,
            "phone": data.phone,
            "mail": data.email,
            "message": data.message,
        }

        const result = await collection.insertOne(data_formatted);
        console.log("Data inserted:", result.insertedId);
        // closeConnection();
    } catch (err) {
        console.error("Error inserting data:", err);
    }
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

app.post('/contact', (req, res)=>{
    // addData(JSON.stringify(req.body));
    insertData(req.body);
    console.log(req.body.name);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Method', '*')
    res.redirect('http://nazmussaqib.in/');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("listening from server");
})