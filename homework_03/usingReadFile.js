const http = require('http');
const fs = require('fs');
const path = require('path');


const app = http.createServer((request, response) => {
    console.time('test');
    usingReadFile(response);
    console.log('The time end is next');
    console.timeEnd('test');
});


app.listen(1221, () => {});

function usingReadFile(response) {
    let file = path.join(__dirname , 'sebook.pdf');  
    fs.readFile(file, (err,data) => {
        if (err) throw err
        else {
            response.end(data);
        }
    });
}