const http = require('http');
const fs = require('fs');
const path = require('path');


const app = http.createServer((request, response) => {
    console.time('test');
    usingStream(response);
    console.log('The time end is next');
    console.timeEnd('test');
});


app.listen(1223, () => {});

function usingStream(response) {
    let file = path.join(__dirname , 'sebook.pdf');
    let getFile = fs.createReadStream(file, {highWaterMark: 16 * 1024});
    getFile.pipe(response);
    
}