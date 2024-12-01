/**
 * Dependencies
 */
const fs = require('fs');
const path = require('path');

/**
 * Gets a text file with values in format of 67669   20743 and rows separated by new lines.
 * @param {string} values - The list of values.
 * @return {Object} - Object with two lists.
 */
function splitValuesFromFile(file) {
    const values = file.split('\n');
    const list1 = [];
    const list2 = [];

    values.forEach((value) => {
        const [first, second] = value
            .split(' ')
            .filter((item) => item !== '');

        list1.push(first.trim());
        list2.push(second.trim());
    });

    return { list1, list2 };
}

/**
 * Gets the distance between two points in a list.
 * Values are first sorted from smallest to largest. Then the distance between the two points is calculated.
 * @param {Array} list1 - The first list.
 * @param {Array} list2 - The second list.
 * @return {number} - The distance between the two lists.
 */
function getDistanceBetweenTwoLists(list1, list2) {
    const sortedList1 = list1.sort((a, b) => a - b);
    const sortedList2 = list2.sort((a, b) => a - b);

    let sum = 0;

    for (let i = 0; i < sortedList1.length; i++) {
        sum += Math.abs(sortedList1[i] - sortedList2[i]);
    }

    return sum;
}

/**
 * Calculates the similarity score between two lists.
 * The similarity score is calculated by multiplying the value of the first list with the number of times it appears in the second list.
 * @param {Array} list1 - The first list.
 * @param {Array} list2 - The second list.
 * @return {number} - The similarity score between the two lists.
 */
function calculateSimilarityScore(list1, list2) {
    let score = 0;

    for (let i = 0; i < list1.length; i++) {
        const value = list1[i];
        const count = list2.filter((item) => item === value).length;

        score += parseInt(value) * count;
    }

    return score;
}

/**
 * Solution
 */
const file = fs.readFileSync(path.resolve(__dirname, 'input'), 'utf8');
const { list1, list2 } = splitValuesFromFile(file);

/**
 * Gets the answer to the first problem
 * @link https://adventofcode.com/2024/day/1
 */
console.log("Distances between the two lists are: ", getDistanceBetweenTwoLists(list1, list2));

/**
 * Gets the answer to the second problem
 * @link https://adventofcode.com/2024/day/1#part2
 */
console.log("Similarity score between the two lists are: ", calculateSimilarityScore(list1, list2));
