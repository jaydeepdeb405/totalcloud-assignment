const httpService = require('./services/httpService');

// node.js server port number
const PORT = 3000;

const DIR_PATH = `${__dirname}/data`;

httpService.startServer(PORT, DIR_PATH);