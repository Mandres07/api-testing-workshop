const todos = require('../data/todos');

exports.getTodos = (req, res, next) => {
   return res.status(200).json(todos);
};

exports.getTodosById = (req, res, next) => {
   const todoId = parseInt(req.params.todoId);
   if (!todoId || typeof todoId !== 'number') {
      return res.status(400).send();
   }
   const todo = todos.find(item => item.id.toString() === todoId.toString());
   if (!todo) {
      return res.status(404).send();
   }
   return res.status(200).json(todo);
};

const validateBody = (userId, title, completed) => {
   let error = null;
   if (typeof userId !== 'number') {
      error = 'userId must be a number';
   }
   if (typeof title !== 'string') {
      error = 'title must be a string';
   }
   if (typeof completed !== 'boolean') {
      error = 'completed must be a boolean';
   }
   return error;
};

exports.createTodo = (req, res, next) => {
   const { userId, title, completed } = req.body;
   if (!userId || !title) {
      console.log(req.body);
      return res.status(400).send();
   }
   const error = validateBody(userId, title, completed);
   if (error) {
      return res.status(400).json({
         message: error
      });
   }
   const maxId = todos.reduce((acc, current) => acc = acc > current.id ? acc : current.id, 0);
   const newTodo = {
      userId,
      id: maxId + 1,
      title,
      completed
   };
   todos.push(newTodo);
   return res.status(201).json(newTodo);
};

exports.updateTodo = (req, res, next) => {
   const todoId = req.params.todoId;
   const { userId, title, completed } = req.body;
   if (!todoId || !userId || !title || !completed) {
      return res.status(400).send();
   }
   const error = validateBody(userId, title, completed);
   if (error) {
      return res.status(400).json({
         message: error
      });
   }
   const updatedTodoIndex = todos.findIndex(todo => todo.id.toString() === todoId.toString());
   if (updatedTodoIndex < 0) {
      return res.status(404).send();
   }
   const updatedTodo = {
      ...todos[updatedTodoIndex],
      userId,
      title,
      completed
   };
   todos[updatedTodoIndex] = updatedTodo;
   return res.status(200).json(todos[updatedTodoIndex]);
};

exports.deleteTodo = (req, res, next) => {
   const todoId = req.params.todoId;
   if (!todoId) {
      return res.status(400).send();
   }
   const todoIndex = todos.findIndex(item => item.id.toString() === todoId.toString());
   if (todoIndex < 0) {
      return res.status(404).send();
   }
   todos.splice(todoIndex, 1);
   return res.status(204).json({
      message: 'Todo removed successfully'
   });
};
