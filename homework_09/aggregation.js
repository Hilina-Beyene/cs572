const express = require('express');
const db = require('./db');
const connectionStrings = require('./connectionStrings');

const app = express();

db.connect((err) => {
    if(err){
        console.log("Error in connecting to database");
        process.exit();
    }else {
        console.log("Database connected successfuly!");
        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    }
});

app.get('/washingtonzipcode', (req, res) => {
    //1
   db.getDB().collection(connectionStrings.collection).aggregate([
        {$match: {state: "WA"}},
        {$group: {_id: "$_id"}}
    ]).toArray((err,doc) => {
        if(err) {
            console.log("Error in getting data: " + err);
        }else{
            let html = "<html><body><div><h1>Zipcodes in Washington state</h1><p>" + doc + "</p></div></html></body>"; 
            res.html(html);
        }
    });
});

app.get('/zipcode-for-less-population', (req, res) => {
    //2
    db.getDB().collection(connectionStrings.collection).aggregate([
        {$match: {pop: {$lt: 5000}}},
        {$project: {population: "$pop"}}
    ]).toArray((err,doc) => {
        if(err) {
            console.log("Error in getting data: " + err);
        }else{
            let html = "<html><body><div><h1>Zipcodes for less population</h1><p>" + doc + "</p></div></html></body>"; 
            res.html(html);
        }
    });
});

app.get('/cities-morethan-one-zipcode', (req, res) => {
    //3
    db.getDB().collection(connectionStrings.collection).aggregate([
        {$group: {_id: "$city", zip: {$sum: 1}}},
        {$match: {zip: {$gt: 1}}},
        {$sort: {"city": 1, "state": 1}}
    ]).toArray((err,doc) => {
        if(err) {
            console.log("Error in getting data: " + err);
        }else{
            let html = "<html><body><div><h1>Cities with more than one zipcodes</h1><p>" + doc + "</p></div></html></body>"; 
            res.html(html);
        }
    });
});

app.get('/least-populated-city', (req, res) => {
    //4
    db.getDB().collection(connectionStrings.collection).aggregate([
        {$group: {_id: "$state", city: {$addToSet: "$city"},population: {$min: "$pop"}}},
    ]).toArray((err,doc) => {
        if(err) {
            console.log("Error in getting data: " + err);
        }else{
            let html = "<html><body><div><h1>Least populated cities</h1><p>" + doc + "</p></div></html></body>"; 
            res.html(html);
        }
    });
});
