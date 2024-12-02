/**
 * Dependencies
 */
const fs = require('fs');
const path = require('path');

/**
 * Gets a text file with text values separated by new lines.
 * @param {string} file - The file with the text values.
 * @return {Map} - Map with the report values in array format.
 */
function getReportsFromFile(file) {
    const rows = file.split('\n');
    const map = new Map();

    for (let i = 0; i < rows.length; i++) {
        const values = rows[i].split(' ').map((value) => parseInt(value));
        map.set(i, values);
    }

    return map;
}

/**
 * Removes the unsafe index from the report and checks if the report is safe.
 * @param {Array} report - The report.
 * @param {number} unSafeIndex - The unsafe index.
 * @return {boolean} - True if the report is safe, otherwise false.
 */
function useProblemDampener( report, unSafeIndex ) {
    const reportCopy = [...report];
    reportCopy.splice(unSafeIndex, 1); // Remove the unsafe index.

    let previous = null;
    let isAscending = false;
    let isDescending = false;

    for (let i = 0; i < reportCopy.length; i++) {
        // Handle the first value.
        if (previous === null) {
            previous = reportCopy[i];
            continue;
        }

        // Check if script is ascending or descending.
        if (previous > reportCopy[i]) {
            isDescending = true;
        }

        if (previous < reportCopy[i]) {
            isAscending = true;
        }

        // Any two adjacent levels differ by at least one and at most three.
        let diff = Math.abs(previous - reportCopy[i]);

        if (diff > 3 || diff === 0) {
            return false;
        }

        // The levels are either all increasing or all decreasing
        // So if both ascending and descending are true, then the report is unsafe.
        if (isAscending && isDescending) {
            return false;
        }

        previous = reportCopy[i];
    }

    return true;
}

/**
 * Gets the amount of safe reports.
 * A report is considered safe if the difference between two consecutive values is less than or equal to 3.
 * @param {Map} reports - The reports.
 * @return {number} - The amount of safe reports.
 */
function getAmountOfSafeReports(reports) {
    let unSafeReports = 0;

    for (const [_, report] of reports) {
        let previous = null;
        let isAscending = false;
        let isDescending = false;

        for (let i = 0; i < report.length; i++) {
            // Handle the first value.
            if (previous === null) {
                previous = report[i];
                continue;
            }

            // Check if script is ascending or descending.
            if (previous > report[i]) {
                isDescending = true;
            }

            if (previous < report[i]) {
                isAscending = true;
            }

            // Any two adjacent levels differ by at least one and at most three.
            let diff = Math.abs(previous - report[i]);

            if (diff > 3 || diff === 0) {
                let isSafe = false; 

                // Check all indexes to see if the report can be fixed.
                for (let j = 0; j < report.length; j++) {
                    isSafe = useProblemDampener(report, j);

                    if (isSafe) {
                        break;
                    }
                }

                if (isSafe) {
                    break;
                }

                unSafeReports++; 
                break;
            }

            // The levels are either all increasing or all decreasing
            // So if both ascending and descending are true, then the report is unsafe.
            if (isAscending && isDescending) {
                let isSafe = false; 

                // Check all indexes to see if the report can be fixed.
                for (let j = 0; j < report.length; j++) {
                    isSafe = useProblemDampener(report, j);

                    if (isSafe) {
                        break;
                    }
                }

                if (isSafe) {
                    break;
                }

                unSafeReports++; 
                break;
            }

            previous = report[i];
        }
    }

    return reports.size - unSafeReports;
}

/**
 * Solution
 */
const file = fs.readFileSync(path.resolve(__dirname, 'input'), 'utf8');
const reports = getReportsFromFile(file);

console.log("The amount of safe reports is: ", getAmountOfSafeReports(reports));
