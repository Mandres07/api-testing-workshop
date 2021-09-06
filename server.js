const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const todosRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json({}));
app.use(cors({}));

app.use('/todos', todosRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res, next) => {
   res.status(200).json({
      message: 'API Testing Workshop.'
   });
});

app.use((req, res, next) => {
   res.status(404).json({
      message: 'Not found',
   });
});

module.exports = app;