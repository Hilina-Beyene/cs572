const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'homework07';

const state = {
    db: null
}

const connect = (callback) => {
    if(state.db) {
        callback();
    }
    else {
        MongoClient.connect(dbUrl, (error, client) => {
            if(error) {
                callback(error);
            }
            else {
                console.log("Database connected sucessfully");
                state.db = client.db(dbName);
                callback();
            }
        });
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};