require("colors");
const readline = require("readline");
const fs = require("fs/promises");
const { program } = require("commander");

// Commander configs
program.option(
  "-f, --file <type>",
  "file for saving results",
  "game_results.txt"
);

program.parse(process.argv);

const logFile = program.opts().file;

/**
 * Simple input data validator
 * @param {number} value - value to validate
 * @returns {boolean}
 */
const isValid = (value) => {
  if (!Number.isNaN(value) && value > 0 && value <= 10) return true;

  if (Number.isNaN(value)) console.log("Please, enter a number!".red);
  if (value < 0 || value > 10)
    console.log("Number should be between 1 and 10".red);

  return false;
};

/**
 * Log game results to the text file.
 * @param {string} message - message to log
 * @returns {Promise<void>} - it means return promise with no data
 */

const logger = async (message) => {
    try {
        await fs.appendFile(logFile, `${message}\n`)
        
        console.log(`Successfully saved game results to the file ${logFile}`.yellow)
    } catch (error) {
        console.log(`Something went very wrong...${error.message}`)
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let counter = 0;

const mind = Math.ceil(Math.random() * 10);

const game = () => {
  rl.question("Enter number, please!\n".green, (value) => {
    const number = +value;

    counter++;

    if (!isValid(number)) return game();

    if (number !== mind) {
      console.log("Ops..Try again!!!".red);
      return game();
    }
    console.log(
      `Congratulations!! You have guessed the number in ${counter} step(s)`
      );
      
      logger(
        `${new Date().toLocaleString(
          "uk-UK"
        )}: Congratulations! You guessed the number in ${counter} step(s) =^^=`
      );

    rl.close();
  });
};

game();
