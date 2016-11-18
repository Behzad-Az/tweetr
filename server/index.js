"use strict";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/twtrData";
var ObjectId = require('mongodb').ObjectID;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  // connect to the MongoDb.
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Read and prepare data from mongo using DataHelpers
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // define routes that use the DataHelper object.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  // delete specific tweet when requested.
  app.post("/delete", (req, res) => {
    db.collection('tweets').remove({"_id":ObjectId(req.body.id)});
    res.redirect("/");
  });

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});