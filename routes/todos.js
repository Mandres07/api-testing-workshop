const express = require('express');
const todosController = require('../controllers/todos');
const isAuth = require('../middleware/is-authenticated');

const router = express.Router();

router.get('/', todosController.getTodos);
router.get('/:todoId', todosController.getTodosById);
router.post('/', isAuth, todosController.createTodo);
router.put('/:todoId', isAuth, todosController.updateTodo);
router.delete('/:todoId', isAuth, todosController.deleteTodo);

module.exports = router;
