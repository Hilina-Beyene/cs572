const http = require('http');
const fs = require('fs');
const path = require('path');


const app = http.createServer((request, response) => {
    console.time('test');
    usingReadFileSync(response);
    console.log('The time end is next');
    console.timeEnd('test');
});


app.listen(1222, () => {});


function usingReadFileSync(response) {
    let getPath = path.join(__dirname , 'alchemist.pdf');
    let file = fs.readFileSync(getPath);
    response.end(file);
}