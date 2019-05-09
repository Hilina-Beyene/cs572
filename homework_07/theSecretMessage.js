const express = require('express');
const db = require('./db');

const app = express();
const collection = 'data';

db.connect((error) => {
    if(error){
        console.log('Unable to connect to database');
        process.exit(1);
    }
    else{
        app.listen(3001, () => {
            console.log('Connected to server on port 3001');
        });
    }
});

app.get('/secret', (req, res) => {
    db.getDB().collection(collection).findOne({}, {_id:0, key: 1, message: 1})
            .then((document) => {
                const encryptor = require('simple-encryptor')(document.key);
                const decryptor = encryptor.decrypt(document.message);
                res.json(decryptor);
            }).catch((error) => {
                console.log('Error in getting data: ' + error);
            });
});