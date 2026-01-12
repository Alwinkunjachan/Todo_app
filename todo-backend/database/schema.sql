-- Create database (run this first if database doesn't exist)
-- CREATE DATABASE IF NOT EXISTS todo_db;
-- USE todo_db;

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_completed (completed),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
-- INSERT INTO todos (title, description, completed) VALUES
-- ('Learn Angular', 'Complete Angular tutorial', FALSE),
-- ('Build Todo App', 'Create full-stack todo application', FALSE),
-- ('Deploy Application', 'Deploy to production server', FALSE);
