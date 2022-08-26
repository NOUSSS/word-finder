const WordFinder = require('./class/module');

console.clear();

new WordFinder({
    prefix: "> ",
    ignore: false,
}).start();
