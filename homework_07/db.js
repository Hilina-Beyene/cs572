const MongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectID;
//const dbUrl = 'mongodb://localhost:27017';
const dbUrl = 'mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01';
const dbName = 'homework01';

const state = {
    db: null
}

const connect =  (callback) => {
    if(state.db)
        callback();
    else{
        MongoClient.connect(dbUrl, (error,client) => {
            if(error){
                callback(error);
            }
            else{
                console.log('DB connected successfully to server');
                state.db = client.db(dbName);
                callback();
            }
        });
    }
}

const getPrimaryKey = (_id) => {
    return objectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect ,getPrimaryKey};
