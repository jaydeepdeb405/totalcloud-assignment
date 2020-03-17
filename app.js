const fileUtil = require('./services/fileUtil');
const csvUtil = require('./services/csvUtil');
const httpService = require('./services/httpService');

let csvDataObj = {};
const dirPath = './data';
const port = 3000;

async function main() {
    let fileNames = await fileUtil.getFilenamesInDir(dirPath);
    for (fileName of fileNames) {
        let subjectName = fileName.split('-')[1].split('.')[0].substr(1);
        let data = await fileUtil.getCsvData(`${dirPath}/${fileName}`);

        csvDataObj = csvUtil.getCsvObject(subjectName, data, csvDataObj);
        
    }

    httpService.getDataByClassName(csvUtil.getCsvObjectByClassName, csvDataObj, port);
    
}

main();