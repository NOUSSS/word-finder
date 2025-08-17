const WordFinder = require("./WordFinder");

console.clear();

new WordFinder({
  prefix: "> ",
  ignore: false,
}).start();
