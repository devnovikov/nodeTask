const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const argv = require('minimist')(process.argv.slice(2));
const base = argv['_'][0];

 function getFiles(dir) {
     new Promise((resolve, reject) => {
        const subDirs = new Promise((resolve, reject) => {
         readDir(dir);
         resolve('ok');
        }).then(function(result){
            console.log(result)
        });
        console.log("Сабдир: " + subDirs);
        const files = Promise.all(subDirs.map(async (subDir) => {
            //console.log('DIR:' + dir);
            //console.log('SUBDIR:' +subDir);
            const fullPath = resolve(dir, subDir);
            console.log(fullPath);
            if ((await stat(fullPath))
                .isDirectory()) {
                return getFiles(fullPath);
            } else {
                return await readFile(fullPath);
            }
        }));
        console.log(files.toString());
        // для каждого элемента массива files запустить функцию, чтобы сцепить все элементы во едино
        // (промежуточный результат, элемент) => новый промежуточный результат, начальное значение

    }).then(function (result) {
        console.log('result 2: ' + result);
         return files.reduce((a, f) => a.concat(f), []);
     });
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


