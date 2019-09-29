const fs = require('fs');
const path = require('path');
//const base = './test';
var argv = argv = require('minimist')(process.argv.slice(2));
const base = argv['_'][0];
var sum = 0;
const readDir = (base, level) => {
  const files = fs.readdirSync(base);

  files.forEach((item) => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      console.log(' '.repeat(level) + 'DIR: ' + item);
      // если это директория, то проверяем дальше, рекурсивно продолжаем искать дальше
      readDir(localBase, level + 1);
    } else {
      console.log(' '.repeat(level) + 'File: ' + item);
      // Здесь мы точно знаем, что это файл, значит надо прочитать его и сложить уже числа
      let result = parseInt(fs.readFileSync(localBase, {encoding: 'utf8'}));
      sum = result + sum;
    }
  });
};

readDir(base, 0);

console.log(sum);

