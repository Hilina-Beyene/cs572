const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();
app.listen(1335);

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), {flags: 'a'}
);

app.use(morgan('combined', {stream: accessLogStream}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/student', (req, res) => {
    let data = db.read();
    res.end(JSON.stringify(data));
});

app.post('/create', (req, res) => {
    if(!req.body.id) {
        return res.status(400).send({
          success: 'false',
          message: 'id is required!'
        });
    }else {
        let format = JSON.stringify({
            "id": req.body.id,
            "name": req.body.name,
            "course": req.body.course,
            "grade": req.body.grade
        })

        let checkString = checkJsonString(format);
        if(checkString){
            let result = db.create(req.body);
            if(result) {
                return res.status(200).send({
                    success: 'true',
                    message: 'Grade added successfully.',
                })
            } else 
                return res.status(500).send({
                    success: 'false',
                    message: 'Some error occured.',
                })
        }
    }
});

app.put('/update', (req, res) => {
    if(!req.body.id) {
        return res.status(400).send({
          success: 'false',
          message: 'id is required!'
        });
    }else {
        let format = JSON.stringify({
            "id": req.body.id,
            "name": req.body.name,
            "course": req.body.course,
            "grade": req.body.grade
        })
        
        let checkString = checkJsonString(format);
        if(checkString){
            let result = db.update(req.body);
            if(result) {
                return res.status(200).send({
                    success: 'true',
                    message: 'Grade updated successfully.',
                })
            } else 
                return res.status(500).send({
                    success: 'false',
                    message: 'Some error occured.',
                })
        }
    }
});

app.delete('/delete/:id', (req, res) => {
    if(!req.body.id) {
        return res.status(400).send({
          success: 'false',
          message: 'id is required!'
        });
    }else {
        const id = parseInt(req.params.id, 10);
        let result = db.delete(id);
        if(result) {
            return res.status(200).send({
                success: 'true',
                message: 'Grade Deleted successfully.',
            })
        } else 
            return res.status(500).send({
                success: 'false',
                message: 'Some error occured.',
            })
    }
});

function checkJsonString(string) {
    try {
        JSON.parse(string);
    } catch (error) {
        console.log("Error: "+error);
        return false;
    }
    return true;
}