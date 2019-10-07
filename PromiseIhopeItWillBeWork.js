const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const argv = require('minimist')(process.argv.slice(2));
// const base = argv['_'][0];
const base = 'test';

function getFiles(dir) {

return readDir(dir)
    .then(files => {
        const promises = [];
        const arrOfString = files.toString().split(',');
        //console.log(Promise.resolve(arrOfString));

        arrOfString.map((newProm) => {
            // In the below line, two things happen.
            // 1. We are calling the async function (timeout()). So at this point the async function has started and enters the 'pending' state.
            // 2. We are pushing the pending promise to an array.
            promises.push(Promise.resolve(newProm));
        });
        //console.log(promises);
        console.log("Сабдир: " + files);
        return files;
    })
    .then((subDirs) => {

        console.log(subDirs);
        return Promise.all(subDirs.map((subDir) => {
            // console.log(subDir);
            // Promise.resolve(subDir).then(fileName => {
            //      const fullPath = resolve(dir, fileName);
            //     console.log(stat(fullPath));
            // });

            console.log('DIR:' + dir);
            console.log('SUBDIR:' + subDir);
            const fullPath = resolve(dir, subDir);
            console.log(fullPath);
            stat(fullPath)
                .then(state => {
                    if (state.isDirectory()) {
                        getFiles(fullPath);
                    } else {
                         return Promise.resolve(readFile(fullPath));
                        // ----------- Если здесь расскомментировать, а закомментировать строку выше, то можно увидеть, что все числа корректно считываются
                        //  readFile(fullPath)
                        // .then(result => {
                        //    console.log('числа:'+result.toString());
                        //    return result;
                        // });
                    }
                });
        })).then((values) => {
            // сюда уже приходит дичь
            console.log('values: ' + values);
            return values.reduce((a, f) => a.concat(f), []);
        });

    });

}
getFiles(base)
    .then(result => {
        console.log('РЕЗУЛЬТАТ: '+ result);
    });


