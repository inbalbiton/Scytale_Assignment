require("dotenv").config();
const { MongoClient } = require('mongodb');
const uri = process.env.DB_URL;


//This function gets the name of a particular collection and query and returns the same collection according to the query and the desired sort
exports.GetTable = async function (name , quary, sorted, order) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try{
    await client.connect();
    let prs = client.db("ScytaleDB").collection(name);
    let cursor = await prs.find(quary).sort({ [sorted] :  parseInt(order) });
    return cursor;
  }
  catch(error){
    client.close();
  }
};
//A function that access the database and adds a new object to a particular collection.
exports.InsertObject = async function (tableName , object) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try{
    await client.connect();
    let prs = client.db("ScytaleDB").collection(tableName);
    let result = await prs.insertOne(object);
    return result;
  }
  catch(error){
    console.log(error);
    client.close();
  }
};

// return the max PR_Number in the "PullRequests" Collection.
exports.MaxID = async function(name){
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try{
    await client.connect();
    let prs =  client.db("ScytaleDB").collection(name);
    let cursor = await prs.find().sort({ PR_Number: -1 }).limit(1);
    let maxID;
    await cursor.forEach((doc) =>{
      maxID = parseInt(doc.PR_Number);
    });
    return maxID;
  }
  catch(error){
    console.log(error);
    client.close();
  }
}

exports.CloseClient = async function(){
  client.close();
  consol.log("Close Client DB");
}