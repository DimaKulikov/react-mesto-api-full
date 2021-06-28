require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/auth');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const joiValidator = require('./middlewares/joiValidator');

const { PORT = 3000 } = process.env;

// Creating a server
const app = express();

// Connecting to DB
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// Routes
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', joiValidator.login, login);
app.post('/signup', joiValidator.signup, createUser);
app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

// 404 route
app.use('*', require('./routes/404'));

// Error handling
app.use(errorLogger);
app.use(errorHandler);

// Starting a server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('started successfully');
});
