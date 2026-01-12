const pool = require('../database/connection');

// Get all todos
const getAllTodos = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// Get single todo by ID
const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM todos WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: {
          message: 'Todo not found',
          status: 404
        }
      });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// Create new todo
const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        error: {
          message: 'Title is required',
          status: 400
        }
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        error: {
          message: 'Title must be at least 3 characters long',
          status: 400
        }
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)',
      [title.trim(), description?.trim() || null, completed || false]
    );

    const [newTodo] = await pool.execute(
      'SELECT * FROM todos WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newTodo[0]);
  } catch (error) {
    next(error);
  }
};

// Update todo
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Check if todo exists
    const [existing] = await pool.execute(
      'SELECT * FROM todos WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        error: {
          message: 'Todo not found',
          status: 404
        }
      });
    }

    // Validation
    if (title !== undefined && title.trim().length === 0) {
      return res.status(400).json({
        error: {
          message: 'Title cannot be empty',
          status: 400
        }
      });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title.trim());
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description?.trim() || null);
    }
    if (completed !== undefined) {
      updates.push('completed = ?');
      values.push(completed);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        error: {
          message: 'No fields to update',
          status: 400
        }
      });
    }

    values.push(id);

    await pool.execute(
      `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const [updated] = await pool.execute(
      'SELECT * FROM todos WHERE id = ?',
      [id]
    );

    res.json(updated[0]);
  } catch (error) {
    next(error);
  }
};

// Delete todo
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if todo exists
    const [existing] = await pool.execute(
      'SELECT * FROM todos WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        error: {
          message: 'Todo not found',
          status: 404
        }
      });
    }

    await pool.execute('DELETE FROM todos WHERE id = ?', [id]);

    res.status(200).json({
      message: 'Todo deleted successfully',
      deletedId: parseInt(id)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
