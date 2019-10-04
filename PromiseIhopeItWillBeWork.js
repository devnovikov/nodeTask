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
        console.log(files);
        const subDirs = files; // что нужно сделать с результатом
        console.log("Сабдир: " + subDirs);
        return subDirs;
    })
    .then((subDirs) => {

        return Promise.all(subDirs.map((subDir) => {
            console.log('DIR:' + dir);
            console.log('SUBDIR:' + subDir);
            const fullPath = resolve(dir, subDir);
            console.log(fullPath);
            stat(fullPath)
                .then(state => {
                    if (state.isDirectory()) {
                        getFiles(fullPath);
                    } else {
                         return readFile(fullPath);
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


