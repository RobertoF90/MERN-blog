const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

// ROUTERS
const postRouter = require('./routes/postRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES

app.use('/api/v1/posts', postRouter);

module.exports = app;
