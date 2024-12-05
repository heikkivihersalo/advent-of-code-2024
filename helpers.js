/**
 * Dependencies
 */
const fs = require('fs');
const path = require('path');

/**
 * Reads a file and returns the content.
 * @param {string} file - The file to read.
 * @return {string} - The file content.
 */
function readFile(file) {
    return fs.readFileSync(path.resolve(__dirname, file), 'utf8');
}

/**
 * Check if a number is a positive integer
 * @param {string} n - The number to check.
 * @return {boolean} - True if the number is a positive integer, otherwise false.
 */
function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

module.exports = {
    readFile,
    isPositiveInteger
};