const fs = require('fs');
const path = require('path');

function checkForFile(fileName, callback) {
    fs.exists(fileName, function (exists) {
        if (exists) {
            let filePath = path.join(__dirname , fileName); 
            callback(filePath);
        } else {
            fs.writeFile(fileName, { flag: 'wx' }, function (err, data) {
                let filePath = path.join(__dirname , fileName); 
                callback(filePath);
            })
        }
    });
}

process.on('message', (fileName) => {
    checkForFile(fileName, function (filePath) {
        fs.readFile(filePath, {encoding: 'utf8'} ,(err, data) => {
            process.send(data);
        });
    });
});
