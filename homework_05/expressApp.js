const express = require('express');
const axios = require('axios');
const rxjs = require('rxjs');


const app = express();
app.listen(3000);

const getRandomuserData = async () => {
    try {
        let randomuser = await axios.get('https://randomuser.me/api/?result=10');
        return randomuser;
    } catch(error) {
        console.log("Error in getting data: " + error);
    }
}

app.set('x-powered-by',false);
app.set('strict routing', true);
app.enable('case sensitive routing');
app.get('/users', (req, res) => {// /users/:id
    getRandomuserData().then((randomuser) => {
        let data = randomuser.data.results;
        res.set({'Cache-Control' : 'private', 'Expires': 'Sat, 4 May 2019 18:31:12 GMT', 'Last-Modified': new Date()});
        res.end(JSON.stringify(data));      
    });
});