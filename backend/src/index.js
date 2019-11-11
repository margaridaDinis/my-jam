require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());
server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    req.userId = userId;
  }
  next();
});

server.express.use(async (req, res, next) => {
  const { userId } = req;

  if (!userId) {
    next();
    return;
  }

  req.user = await db.query.user(
    { where: { id: userId } },
    '{ id, name, email, permissions }',
  );

  next();
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, (details) => {
  // eslint-disable-next-line
  console.warn(`The server is now running on PORT http://localhost:${details.port}`);
});
