var dir = require('node-dir');
var argv = argv = require('minimist')(process.argv.slice(2));
const base = argv['_'][0];

var sum = 0;
dir.readFiles(base,
    function(err, content, next) {
        if (err) throw err;
        console.log('Числа:', content);
        let arrOfString = content.split(' ');
        //console.log(arrOfString);
        for (let i = 0; i < arrOfString.length; i++) {
            sum = sum + parseInt(arrOfString[i]);
        }
        next();
    },
    function(err, files){
        if (err) throw err;
        console.log('Список файлов:', files);
        console.log('Результат:', sum);
    });

