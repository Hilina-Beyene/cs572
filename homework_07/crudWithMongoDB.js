const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./localDBConnection');

const app = express();
const collection = 'lecture';

db.connect((error) => {
    if(error){
        console.log("Error in connecting to database: " + error);
        process.exit(1);
    }else {
        app.listen(3001, () => {
            console.log("Server is connected on port 3001");
        });
    }
});

app.use(cors());
app.use(bodyParser.json());
app.get('/lecture', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((error, documents) => {
        if(error)
            console.log(JSON.stringify(error));
        else {
            res.json(documents);
        }
    });
});

app.get('/search/:q', (req, res) => { 
    let q = req.params.q;
    if(q) {
        db.getDB().collection(collection).findOne({name: {$regex: ".*" + q + ".*"}})
        .then((document) => {
            res.json(document);
        }).catch((err) => {
            console.log('Error in retriving document: '+err);
        });
    }
});

app.post('/create', (req, res) => {
    let result = db.getDB().collection(collection).insertOne(req.body);
    res.json({Result: 'Inserted successfully'});
});

app.put('/update', (req, res) => {
    db.getDB().collection(collection).updateOne({_id: db.getPrimaryKey(req.body._id)}, 
         {$set: {name: req.body.name}},
         {$set: {course: req.body.course}},
        (result) => {
            res.json(result);
        });
});

app.delete('/delete', (req, res) => {
    let result = db.getDB().collection(collection).deleteOne({name: req.body.name});
    res.json(result);
});