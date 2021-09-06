const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const todosRoutes = require('./routes/todos');

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json({}));
app.use(cors({}));

app.use('/todos', todosRoutes);

app.get('/', (req, res, next) => {
   res.status(200).json({
      message: 'API Testing Workshop.'
   });
});

// app.use((error, req, res, next) => {
//    console.error(error);
//    res.status(500).json({
//       message: error.message,
//    });
// });

module.exports = app;