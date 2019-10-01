const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const argv = require('minimist')(process.argv.slice(2));
const base = argv['_'][0];

async function getFiles(dir) {
    const subDirs = await readDir(dir);
    const files = await Promise.all(subDirs.map(async (subDir) => {
        //console.log('DIR:' + dir);
        //console.log('SUBDIR:' +subDir);
        const fullPath = resolve(dir, subDir);
        console.log(fullPath);
        if ((await stat(fullPath)).isDirectory()) {
            return getFiles(fullPath);
        } else {
            return await readFile(fullPath);
        }
    }));
    //вернем данные в буфере
    return files.reduce((a, f) => a.concat(f), []);
}

getFiles(base)
    .then(files => {
        let sum = 0;
            //console.log(files.toString());
            let arrOfString = files.toString().replace(/,/g , " ").split(' ');
            console.log(arrOfString);
        for (let i = 0; i < arrOfString.length; i++) {
            sum = sum + parseInt(arrOfString[i]);
        }
        console.log(sum);
        }
    )
    .catch(e => console.error(e));


