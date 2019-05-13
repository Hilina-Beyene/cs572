const MongoClient = require('mongodb').MongoClient;
const connectionStrings = require('./connectionStrings');

const state = {
    db: null
}

const connect = (callback) => {
      if(state.db){
          callback();
      }
      else{
          MongoClient.connect(connectionStrings.url, (err, client) =>{
                if(err)
                    callback(err);
                else{
                    state.db = client.db(connectionStrings.dbName);
                    callback();
                }
          });
      }
};

const getDB = () => {
    return state.db;
}

module.exports = {connect, getDB};