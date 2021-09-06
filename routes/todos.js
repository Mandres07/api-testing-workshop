const express = require('express');
const todosController = require('../controllers/todos');
// const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', todosController.getTodos);
router.get('/:todoId', todosController.getTodosById);
router.post('/', todosController.createTodo);
router.put('/:todoId', todosController.updateTodo);
router.delete('/:todoId', todosController.deleteTodo);

module.exports = router;
