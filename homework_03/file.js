const http = require('http');
const fs = require('fs');
const path = require('path');
//const Error = require('error');

const app = http.createServer((request, response) => {
    
    //usingReadFileSync(response);
    usingReadFile(response);
    //usingStream(response);
});

app.listen(1221, () => {});


function usingReadFileSync(response) {
    let getPath = path.join(__dirname , 'alchemist.pdf');
    let file = fs.readFileSync(getPath);
    response.end(file);
}

function usingReadFile(response) {
    let file = path.join(__dirname , 'sebook.pdf');  
    fs.readFile(file, (err,data) => {
        if (err) throw err
        else {
            response.end(data);
        }
    });
}

function usingStream(response) {
    let file = path.join(__dirname , 'sebook.pdf');
    let getFile = fs.createReadStream(file, {highWaterMark: 16 * 1024});
    getFile.pipe(response);
    
}