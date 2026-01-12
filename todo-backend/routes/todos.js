const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// GET /api/todos - Get all todos
router.get('/', getAllTodos);

// GET /api/todos/:id - Get single todo
router.get('/:id', getTodoById);

// POST /api/todos - Create new todo
router.post('/', createTodo);

// PUT /api/todos/:id - Update todo
router.put('/:id', updateTodo);

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', deleteTodo);

module.exports = router;
