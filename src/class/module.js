const { red, green } = require('colors');
const { stdin, stdout, exit } = process;
const { copy } = require('copy-paste');

class WordFinder {

    constructor({ prefix, ignore }) {

        this.prefix = prefix;
        this.ignore = ignore;
        this.words = null;
        this.try = 1;
        this.cache = [];
        this.logger = {

            error: (msg) => console.log(`${red('[')}ERROR${red("]")} ${msg}`),
            confirm: (title, msg) => console.log(`${green('[')}${title}${green("]")} ${msg}\n\n`),
            log: (msg) => stdout.write(msg),

        };

    };

    async getWords() {

        const req = require('french-words-gender-lefff/dist/words.json');
        const words = Object.keys(req);

        words.splice(0, 90);

        this.words = words;
    };

    async start() {

        this.getWords();
        this.logger.log(`\n${this.prefix}  `);

        stdin.resume();

        stdin.on('data', async data => {

            stdin.pause();

            data = data.toString().trim();

            switch (data) {

                case "clear":

                    console.clear();

                    this.cache = [];
                    this.logger.confirm('CLEAR', "Cache cleared.");

                    break;

                case "exit":

                    exit();

                    break;

                default:


                    try {

                        const word = this.words.filter(e => e.includes(data)).sort((a, b) => a.length - b.length);

                        if (!this.ignore) {

                            if (this.cache?.includes(word[0])) {

                                word.splice(0, this.try);

                                this.logger.confirm(`COPIÉ`, `${word[0]}`);
                                copy(word[0]);

                                this.try++;

                            } else {


                                this.logger.confirm(`COPIÉ`, `${word[0]}`);
                                copy(word[0]);

                                this.cache.push(word[0]);

                            };

                        } else {
                            this.logger.confirm(`COPIÉ`, `${word[0]}`);
                            copy(word[0]);

                            this.cache.push(word[0]);
                        };

                    } catch {
                        this.logger.error(`Aucun mot trouvé.\n\n`);
                    };

                    break;
            };

            this.logger.log(`${this.prefix}  `);
            stdin.resume();

        });

    };


};

module.exports = WordFinder;
