require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();

// // Node Server
// const server = require('http').createServer(app);
// module.exports.io = require('socket.io')(server);
// require('./sockets/socket');

