require('dotenv');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middleware to handle cookies (JWT)
// TODO use express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, details => {
  console.warn(`The server is now running on PORT http://localhost:${details.port}`)
});
