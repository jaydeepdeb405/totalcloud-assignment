const fs = require('fs');

const getFilenamesInDir = async function (dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, function (err, files) {
            if (err) reject(err);
            resolve(files);
        });
    });
};

const readDataFromFile = async function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const createReadStream = function (path) {
    return fs.createReadStream(path, 'utf8');
}

const writeJSONToFile = async function (csvDataObj, fileName) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(csvDataObj, null, 2), function (err) {
            if (err) throw err;
            console.log(`${fileName} is created successfully`);
            resolve(`${fileName} is created successfully`);
        });
    });
}

module.exports = { getFilenamesInDir, readDataFromFile, writeJSONToFile, createReadStream };