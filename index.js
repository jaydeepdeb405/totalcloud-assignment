const httpService = require('./services/httpService');

// node.js server port number
const PATH_TO_CSV = '/data';
const PORT = 3000;
const PORT_FOR_STATIC = 4200;

httpService.startServer(PORT, __dirname+PATH_TO_CSV);

httpService.serveStatic(PORT_FOR_STATIC, __dirname);