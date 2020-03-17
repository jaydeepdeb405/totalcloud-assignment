const http = require('http');
const url = require('url');

const getDataByClassName = function (getData, data, port) {
    http.createServer(function (request, response) {

        const queryParams = url.parse(request.url, true).query;
        let timeTableByClassName = "";
        if (queryParams.class)
            timeTableByClassName = JSON.stringify(getData(queryParams.class, data), null, 2);

        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': '*',
            'X-Powered-By': 'nodejs'
        });

        response.write(timeTableByClassName);
        response.end();

    }).listen(port);
}



module.exports = { getDataByClassName };