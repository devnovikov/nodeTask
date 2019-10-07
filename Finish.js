const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const argv = require('minimist')(process.argv.slice(2));
const base = argv['_'][0];
//const base = 'test';

function getFiles(dir) {

return readDir(dir)
    .then(files => {
        const promises = [];
        files.map((newProm) => {
            promises.push(Promise.resolve(newProm));
        });
        console.log("Сабдир: " + files);
        return promises;
    })
    .then((subDirs) => {
        return Promise.all(subDirs.map((subDir) => {
            return Promise.resolve(subDir).then(fileName => {
                const fullPath = resolve(dir, fileName);
                    return stat(fullPath)
                        .then(state => {
                            if (state.isDirectory()) {
                                 return getFiles(fullPath);
                            } else {
                                 return readFile(fullPath)
                                    .then(result => {
                                       console.log('числа:'+result.toString());
                                       return result;
                                    });
                                 }
                            });
                        });
        })).then((values) => {
            console.log('values: ' + values);
            return values.reduce((a, f) => a.concat(f), []);
        });

    });

}
getFiles(base)
    .then(files => {
            let sum = 0;
            let arrOfString = files.toString().replace(/,/g , " ").split(' ');
            console.log(arrOfString);
            for (let i = 0; i < arrOfString.length; i++) {
                sum = sum + parseInt(arrOfString[i]);
            }
            console.log(sum);
        }
    )
    .catch(e => console.error(e));