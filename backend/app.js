const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

// ROUTERS
const postRouter = require('./routes/postRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

app.use('/api/v1/posts', postRouter);

// STATIC FILES
// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'fontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome!' });
  });
}
module.exports = app;
