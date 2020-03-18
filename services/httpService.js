const http = require('http');
const url = require('url');
const csvUtil = require('./csvUtil');
const fileUtil = require('./fileUtil');

const DIR_PATH = './data';

const startServer = function (PORT) {
    http.createServer(async function (request, response) {
        let csvDataObj = {};
        
        const FILE_NAMES = await fileUtil.getFilenamesInDir(DIR_PATH);
        for (fileName of FILE_NAMES) {
            let subjectName = fileName.split('-')[1].split('.')[0].substr(1);
            let data = await fileUtil.getCsvData(`${DIR_PATH}/${fileName}`);
    
            csvDataObj = csvUtil.getCsvObject(subjectName, data, csvDataObj);
            
        }

        const queryParams = url.parse(request.url, true).query;
        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': '*'
        });

        if (queryParams.class) {
            response.write(JSON.stringify(csvUtil.getCsvObjectByClassName(queryParams.class, csvDataObj), null, 2));
            console.log('\x1b[33m%s\x1b[0m', `Request method = GET\nURL = ${request.url}\n`);
        }
        else if (request.url.toString() === '/adjustTimeTable') {
            response.write(JSON.stringify(csvUtil.getCsvObjectWithNoIdleTeachers(csvDataObj), null, 2));
            console.log('\x1b[33m%s\x1b[0m', `Request method = GET\nURL = ${request.url}\n`);
        }
        else {
            response.write(JSON.stringify(csvDataObj, null, 2));
            console.log('\x1b[33m%s\x1b[0m', `Request method = GET\nURL = ${request.url}\n`);
        }
        response.end();

    }).listen(PORT);
    console.log('\x1b[36m%s\x1b[0m', `Server listening on ${PORT}\n`);
}

module.exports = {
    startServer
};