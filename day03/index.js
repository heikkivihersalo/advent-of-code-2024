/**
 * Dependencies
 */
const { readFile, isPositiveInteger } = require('../helpers.js');

/**
 * Check mul command
 * @param {string} file - The file content.
 * @param {number} cursor - The cursor position.
 * @return {Array} - The new cursor position and the mul command.
 */
function checkMul (file, cursor) {
    if (file[cursor] !== 'm') {
        return [ cursor, null ];
    }

    if (file[cursor + 1] !== 'u') {
        return [ cursor + 1, null ];
    }

    if (file[cursor + 2] !== 'l') {
        return [ cursor + 2, null ];
    }

    if (file[cursor + 3] !== '(') {
        return [ cursor + 3, null ];
    }

    let values = [];
    let commands = [];

    for (let i = cursor + 4; i < file.length; i++) {
        if (isPositiveInteger(file[i])) {
            values.push(file[i]);
        } else {
            if (file[i] === ')') {
                commands.push(values.join(''));
                break;
            }

            if (file[i] === ',') {
                values.push(",");
                continue;
            }

            break;
        }

        cursor++;
    }

    return [ cursor, commands ];
}

/**
 * Get mul commands
 * @param {string} file - The file content.
 * @return {Array} - The mul commands.
 */
function getMULCommands(file) {
    let commands = [];
    // Loop through the string
    for (let cursor = 0; cursor < file.length; cursor++) {
        const [ newCursor, values ] = checkMul(file, cursor);

        if (values !== null) {
            cursor = newCursor;

            if (values.length > 0) {
                commands.push(values);
            }
        }
    }

    return commands;
}

/**
 * Calculate mul total
 * @param {Array} commands - The commands.
 * @return {number} - The total.
 */
function calculateMULTotal(commands) {
    let total = 0;

    for (let i = 0; i < commands.length; i++) {
        let values = commands[i][0].split(',');

        let product = 1;

        for (let j = 0; j < values.length; j++) {
            product *= parseInt(values[j]);
        }

        total += product;
    }

    return total;
}

/**
 * Solution
 */
const file = readFile('day03/input');

const commands = getMULCommands(file);
const total = calculateMULTotal(commands); // 174336360

console.log(total);
