const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);


// async function myF() {
//     let names;
//     try {
//         names = await readdir('test');
//         console.log(__dirname)
//     } catch (err) {
//         console.log(err);
//     }
//
//     if (names === undefined) {
//         console.log('undefined');
//     } else {
//         names.forEach((item) => {
//             myStat(item);
//         });
//         console.log('First Name', names);
//     }
// }
//
// myF();
//
// async function myStat(item) {
//     let state;
//     try {
//         console.log(item);
//          state = await stat(item);
//          if (state.isDirectory()) {
//              //console.log('DIR: '+ item);
//              //myF(names[i])
//          }
//              // else {
//         //     console.log(' '.repeat(level) + 'File: ' + state);
//         // }
//     } catch (err) {
//         console.log(err);
//     }
//
// }




function readDirAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, {encoding: 'utf8'}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
                // //sum = sum + parseInt(result);
                // let arrOfString = result.split(' ');
                // console.log(arrOfString);
                // for (let i = 0; i < arrOfString.length; i++) {
                //     sum = sum + parseInt(arrOfString[i]);
                // }
                // console.log(sum);
            }
        });
    });
}

function checkStatAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.stat(path, function (err, state) {
            if (err) {
                reject(err);
            }
            if (state.isDirectory()) {
                console.log('DIR: ' + item);
                // если это директория, то проверяем дальше, рекурсивно продолжаем искать дальше
                readDirAsync(path);
            } else {
                console.log('File: ' + item);
                // Здесь мы точно знаем, что это файл, значит надо прочитать его и сложить уже числа
            }
        });
    });
}





const run = async () => {
    let res = await readDirAsync('test');


    //const state = await checkStatAsync('test');
    let read = await readFileAsync(res[2]);
    console.log(res);
    console.log(read);
    //console.log(state);
};

run();











//
// fs.stat(names, (err, state) => {
//     if (err) return console.log(err);
//
//     if (state.isDirectory()) {
//         console.log(' '.repeat(level) + 'DIR: ' + item);
//         // если это директория, то проверяем дальше, рекурсивно продолжаем искать дальше
//         readDir(localBase, level + 1);
//     } else {
//         console.log(' '.repeat(level) + 'File: ' + item);
//         // Здесь мы точно знаем, что это файл, значит надо прочитать его и сложить уже числа
//         fs.readFile(localBase, {encoding: 'utf8'}, (err, result) => {
//             //sum = sum + parseInt(result);
//             let arrOfString = result.split(' ');
//             console.log(arrOfString);
//             for (let i = 0; i < arrOfString.length; i++) {
//                 sum = sum + parseInt(arrOfString[i]);
//             }
//             cb(err, sum);
//         });
//     }
// });