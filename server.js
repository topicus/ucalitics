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
		var options = {
			"limit": 5
		};

		db.collection('flights').find({}, options).toArray((err, data) => {
			res.send(data);
		});
	})
	app.listen(3000, () =>{
		console.log("El servidor esta corriendo sobre http://localhost:3000");
	});
});
