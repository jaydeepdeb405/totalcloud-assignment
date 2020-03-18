const http = require('http');
const url = require('url');
const csvUtil = require('./csvUtil');
const fileUtil = require('./fileUtil');
const path = require('path');

const startServer = function (PORT, DIR_PATH) {
    http.createServer(async function (request, response) {
        let csvDataObj = {};

        const FILE_NAMES = await fileUtil.getFilenamesInDir(DIR_PATH);
        for (fileName of FILE_NAMES) {
            let subjectName = fileName.split('-')[1].split('.')[0].substr(1);
            let data = await fileUtil.readDataFromFile(`${DIR_PATH}/${fileName}`);

            csvDataObj = csvUtil.getCsvObject(subjectName, data, csvDataObj);

        }

        const queryParams = url.parse(request.url, true).query;
        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': '*'
        });

        if (queryParams.class) {
            if (request.url.toString().startsWith('/adjustTimeTable')) {
                const adjustedTableData = csvUtil.getAdjustedTimeTable(csvDataObj);
                const res = {
                    extraTeachersRequired: adjustedTableData.extraTeachersRequired,
                    timeTable: csvUtil.getTimeTableByClassName(queryParams.class, adjustedTableData.timeTable)
                }
                response.write(JSON.stringify(res, null, 2));
                console.log('\x1b[33m%s\x1b[0m', `Request method = GET\nURL = ${request.url}\n`);
            }
            else {
                response.write(JSON.stringify(csvUtil.getTimeTableByClassName(queryParams.class, csvDataObj), null, 2));
                console.log('\x1b[33m%s\x1b[0m', `Request method = GET\nURL = ${request.url}\n`);
            }
        }
        else {
            response.write(JSON.stringify({}, null, 2));
            console.log('\x1b[33m%s\x1b[0m', `Request method = GET\nURL = ${request.url}\n`);
        }

        response.end();

    }).listen(PORT);
    console.log('\x1b[36m%s\x1b[0m', `Server listening on ${PORT}\n`);
}


const serveStatic = function (PORT, DIR_PATH) {
    http.createServer(async function (req, res) {

        if (req.url === "/") {
            const html = await fileUtil.readDataFromFile(`${DIR_PATH}/index.html`);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        }
        else if (req.url.match("\.css$")) {
            var cssPath = path.join(DIR_PATH, '', req.url);
            var fileStream = fileUtil.createReadStream(cssPath);
            res.writeHead(200, { "Content-Type": "text/css" });
            fileStream.pipe(res);
        }
        else if (req.url.match("\.js$")) {
            var jsPath = path.join(DIR_PATH, '', req.url);
            var fileStream = fileUtil.createReadStream(jsPath);
            res.writeHead(200, { "Content-Type": "text/javascript" });
            fileStream.pipe(res);
        }
        else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("No Page Found");
        }

    }).listen(PORT);
    console.log('\x1b[36m%s\x1b[0m', `Static content on ${PORT}\n`);
}

module.exports = { startServer, serveStatic };