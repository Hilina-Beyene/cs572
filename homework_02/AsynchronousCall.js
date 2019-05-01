const http = require('http');

let app = http.createServer((req, res) => {
    //req.writeHead(200,{"Content-Type": "text/plain"});
    res.end('Hello World\n');
});

app.listen(1337, () => '');

Array.prototype.even = function(alternative) { 
    let theArray = this;
    let result = [];
    setTimeout(function() {
        if(alternative) {
            for(let i=0; i<alternative.length; i++) {
                if(alternative[i] % 2 == 0)
                    result.push(alternative[i]);
            }
        }else{
            for(let i=0; i<theArray.length; i++) {
                if(theArray[i] % 2 == 0)
                    result.push(theArray[i]);
            }
        }
        console.log(result);
    },1000);
}

Array.prototype.odd = function(alternative) {
    let theArray = this;
    let result = [];
    setTimeout(function() {
        if(alternative) {
            for(let i=0; i<alternative.length; i++) {
                if(alternative[i] % 2 != 0)
                    result.push(alternative[i]);
            }
        }else{
            for(let i=0; i<theArray.length; i++) {
                if(theArray[i] % 2 != 0)
                    result.push(theArray[i]);
            }
        }
        console.log(result);
    }, 1000);
}

function  test() {
    console.log('start');
    [1,2,3,4,5,6,7,8].even();
    [1,2,3,4,5,6,7,8].odd();
    console.log('end');
}
test();