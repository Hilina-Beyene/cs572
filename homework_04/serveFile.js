const http = require('http');
const {fork} = require('child_process');
const url = require('url');

const app = http.createServer((request, response) => {
    const reqUrl = url.parse(request.url);
    console.log(reqUrl);
    const child = fork('childProcess.js');
    child.send('test.txt');
    child.on('message', file => {
        response.end(file);
    });
});

app.listen(8888);

