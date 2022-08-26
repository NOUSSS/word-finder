require('colors');
const { stdin, stdout, exit } = process;

class CheatJKLM {

    constructor({ prefix, ignore }) {

        this.prefix = prefix;
        this.ignore = ignore;

        this.words = null;
        this.try = 1;

        this.base = new Array();

        this.wait = () => new Promise(res => setTimeout(res, 1500, true));

        this.logger = {

            error: (msg) => stdout.write(`[`.red + `ERROR` + `]`.red + ` ${msg}`),
            confirm: (title, msg) => stdout.write(`[`.green + `${title}` + `]`.green + ` ${msg}\n\n`),
            log: (msg) => stdout.write(msg),

        };

    };

    async getWords() {

        const req = require('french-words-gender-lefff/dist/words.json');
        const words = Object.keys(req);

        words.splice(0, 90);

        this.words = words;

        return this;

    };

    async start() {

        this.getWords();

        const { copy } = require('copy-paste');

        await this.wait();

        this.logger.log(`\n${this.prefix}  `);
        stdin.resume();

        stdin.on('data', async data => {

            stdin.pause();

            data = data.toString().trim();

            switch (data) {

                case "clear":

                    console.clear();

                    this.base = [];
                    this.logger.confirm('CLEAR', "Cache cleared.");

                    break;

                case "exit":

                    exit();

                    break;

                default:


                    try {

                        const word = this.words.filter(e => e.includes(data)).sort((a, b) => a.length - b.length);

                        if (!this.ignore) {

                            if (this.base?.includes(word[0])) {

                                word.splice(0, this.try);

                                await this.wait();

                                this.logger.confirm(`COPIED`, `${word[0]}`);
                                copy(word[0]);

                                this.try++;

                            } else {


                                this.logger.confirm(`COPIED`, `${word[0]}`);
                                copy(word[0]);

                                await this.wait();

                                this.base.push(word[0]);

                            };

                        } else {
                            this.logger.confirm(`COPIED`, `${word[0]}`);
                            copy(word[0]);

                            await this.wait();

                            this.base.push(word[0]);
                        };

                    } catch {
                        this.logger.error(`Aucun message trouvé.\n\n`);
                    };

                    break;
            };

            this.logger.log(`${this.prefix}  `);
            stdin.resume();

        });

    };


};

module.exports = CheatJKLM;