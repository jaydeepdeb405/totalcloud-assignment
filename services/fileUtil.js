const fs = require('fs');

const getFilenamesInDir = async function (dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, function (err, files) {
            if (err) reject(err);
            resolve(files);
        });
    });
};

const getCsvData = async function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const writeJSONToFile = async function (csvDataObj) {
    return new Promise((resolve, reject) => {
        fs.writeFile('classWiseRoutine.txt', JSON.stringify(csvDataObj, null, 2), function (err) {
            if (err) throw err;
            resolve('File is created successfully.');
        });
    });
}

module.exports = { getFilenamesInDir, getCsvData, writeJSONToFile };