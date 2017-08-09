const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/airport"
const express = require("express")

MongoClient.connect(uri, (err, db) =>{
  let app = express()
  let path=require("path")

  app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "/index.html") )
  })
  app.use(express.static("public") )
  app.get("/report", (req, res) => {
    db .collection('flights').find().limit(5).toArray(function(err, result){
      res.send(result);
    })
  })
  app.listen(3000, () =>{
    console.log("El servidor esta corriendo sobre http://localhost:3000");
  });
});
