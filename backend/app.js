require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const router = require('./routes/index');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// Массив разешённых доменов
// const allowedCors = [
//   'localhost:3000',
//   'localhost:3001',
//   'http://localhost:3001',
//   'https://localhost:3001',
//   'http://localhost:3000',
//   'https://localhost:3000',
// ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// app.use((req, res, next) => {
//   const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок
//   // console.log(origin);
//   const { method } = req;
//   const reqHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', reqHeaders);
//     return res.end();
//   }
//   next();
//   return null;
// });

const options = {
  origin: [
    'http://mesto.evgeta.nomoredomains.sbs',
    'https://mesto.evgeta.nomoredomains.sbs',
    'localhost:3000',
    'localhost:3001',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));
// app.use(cors());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
