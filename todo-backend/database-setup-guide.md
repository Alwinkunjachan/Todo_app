# MySQL Database Setup Guide

This guide will walk you through setting up a local MySQL database for the Todo Application backend.

## Prerequisites

- macOS operating system
- Homebrew installed (or MySQL installer)
- Node.js and npm installed
- Backend dependencies installed (`npm install` in todo-backend folder)

## Step 1: Install MySQL on macOS

### Option A: Using Homebrew (Recommended)

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install MySQL**:
   ```bash
   brew install mysql
   ```

3. **Start MySQL Service**:
   ```bash
   brew services start mysql
   ```

4. **Secure MySQL Installation** (set root password):
   ```bash
   mysql_secure_installation
   ```
   
   Follow the prompts:
   - Set root password: **Yes** (choose a strong password and remember it)
   - Remove anonymous users: **Yes**
   - Disallow root login remotely: **Yes**
   - Remove test database: **Yes**
   - Reload privilege tables: **Yes**

### Option B: Using MySQL Installer

1. Download MySQL Community Server from: https://dev.mysql.com/downloads/mysql/
2. Choose macOS installer (.dmg file)
3. Run the installer and follow the setup wizard
4. **Important**: Note the root password when prompted
5. MySQL will start automatically after installation

### Verify Installation

```bash
# Check MySQL version
mysql --version

# Test connection (you'll be prompted for password)
mysql -u root -p
# Type 'exit' to quit MySQL
```

## Step 2: Create Database and User

1. **Connect to MySQL**:
   ```bash
   mysql -u root -p
   ```
   Enter your root password when prompted.

2. **Create the Database**:
   ```sql
   CREATE DATABASE IF NOT EXISTS todo_db;
   ```

3. **Create a Dedicated User** (Optional but Recommended for Security):
   ```sql
   CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
   Replace `'your_secure_password'` with a strong password of your choice.

4. **Verify Database Creation**:
   ```sql
   SHOW DATABASES;
   ```
   You should see `todo_db` in the list.

5. **Exit MySQL**:
   ```sql
   exit;
   ```

## Step 3: Run Database Schema

1. **Navigate to Backend Directory**:
   ```bash
   cd /Users/alwinkunjachan/Documents/GitHub/Todo_app/todo-backend
   ```

2. **Run the Schema File**:
   
   If using root user:
   ```bash
   mysql -u root -p todo_db < database/schema.sql
   ```
   
   If using the dedicated user you created:
   ```bash
   mysql -u todo_user -p todo_db < database/schema.sql
   ```
   
   Enter your password when prompted.

3. **Verify Table Creation**:
   ```bash
   # Check tables exist
   mysql -u root -p todo_db -e "SHOW TABLES;"
   
   # View table structure
   mysql -u root -p todo_db -e "DESCRIBE todos;"
   ```
   
   You should see the `todos` table with columns: id, title, description, completed, created_at, updated_at.

## Step 4: Configure Environment Variables

1. **Create .env file** in the `todo-backend/` directory:
   ```bash
   cd /Users/alwinkunjachan/Documents/GitHub/Todo_app/todo-backend
   cp .env.example .env
   ```

2. **Edit the .env file** with your text editor:
   ```bash
   nano .env
   # or
   code .env
   # or
   vim .env
   ```

3. **Update the database credentials**:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_mysql_root_password
   DB_NAME=todo_db
   DB_PORT=3306
   ```
   
   **Important**: Replace `your_actual_mysql_root_password` with the actual password you set during MySQL installation.
   
   If you created a dedicated user, use:
   ```env
   DB_USER=todo_user
   DB_PASSWORD=your_secure_password
   ```

4. **Verify .env file exists**:
   ```bash
   ls -la .env
   ```
   
   **Security Note**: The `.env` file should already be in `.gitignore` to prevent committing credentials to version control.

## Step 5: Test Database Connection

1. **Start the Backend Server**:
   ```bash
   cd /Users/alwinkunjachan/Documents/GitHub/Todo_app/todo-backend
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

2. **Check Console Output**:
   - ✅ Success: You should see `✅ Database connected successfully`
   - ❌ Error: If you see connection errors, check:
     - MySQL service is running: `brew services list`
     - Credentials in `.env` file are correct
     - Database `todo_db` exists

3. **Test API Endpoints**:
   
   Open a new terminal and test the API:
   ```bash
   # Health check
   curl http://localhost:3000/api/health
   
   # Get all todos (should return empty array initially)
   curl http://localhost:3000/api/todos
   ```
   
   Expected responses:
   - Health check: `{"status":"OK","message":"Todo API is running",...}`
   - Todos: `[]` (empty array)

## Step 6: Verify Complete Setup

1. **Check MySQL Service Status**:
   ```bash
   brew services list
   ```
   Should show `mysql` as `started`.

2. **Test Database Connection Manually**:
   ```bash
   mysql -u root -p todo_db
   ```
   Inside MySQL:
   ```sql
   SELECT * FROM todos;
   ```
   Should return an empty result set (no rows yet).
   ```sql
   exit;
   ```

3. **Test Full Stack Application**:
   
   **Terminal 1 - Start Backend**:
   ```bash
   cd /Users/alwinkunjachan/Documents/GitHub/Todo_app/todo-backend
   npm start
   ```
   
   **Terminal 2 - Start Frontend**:
   ```bash
   cd /Users/alwinkunjachan/Documents/GitHub/Todo_app/todo-frontend
   npm start
   ```
   
   **Browser**:
   - Open http://localhost:4200
   - Create a new todo
   - Verify it appears in the list
   - Toggle completion status
   - Delete a todo

## Quick Reference Commands

### MySQL Service Management
```bash
# Start MySQL
brew services start mysql

# Stop MySQL
brew services stop mysql

# Restart MySQL
brew services restart mysql

# Check status
brew services list
```

### Database Operations
```bash
# Connect to MySQL
mysql -u root -p

# Connect to specific database
mysql -u root -p todo_db

# Run SQL file
mysql -u root -p todo_db < database/schema.sql

# Quick query
mysql -u root -p todo_db -e "SELECT * FROM todos;"
```

### Backend Operations
```bash
# Navigate to backend
cd todo-backend

# Install dependencies
npm install

# Start server
npm start

# Development mode (auto-reload)
npm run dev
```

## Troubleshooting

### Issue: MySQL Not Starting

**Symptoms**: `brew services list` shows mysql as stopped or error starting.

**Solutions**:
```bash
# Check MySQL logs
tail -f /usr/local/var/mysql/*.err

# Restart MySQL
brew services restart mysql

# If still failing, check if port 3306 is in use
lsof -i :3306
```

### Issue: Connection Refused Error

**Symptoms**: Backend shows "Connection refused" error.

**Solutions**:
1. Verify MySQL is running: `brew services list`
2. Check MySQL is listening on port 3306: `lsof -i :3306`
3. Verify credentials in `.env` file
4. Test connection manually: `mysql -u root -p`

### Issue: Access Denied Error

**Symptoms**: "Access denied for user" error.

**Solutions**:
1. Verify username and password in `.env` file
2. Test credentials manually: `mysql -u root -p`
3. Check user privileges:
   ```sql
   SHOW GRANTS FOR 'root'@'localhost';
   ```
4. Reset password if needed:
   ```bash
   mysqladmin -u root -p password 'newpassword'
   ```

### Issue: Database Doesn't Exist

**Symptoms**: "Unknown database 'todo_db'" error.

**Solutions**:
```bash
mysql -u root -p
CREATE DATABASE todo_db;
exit;
```

### Issue: Table Doesn't Exist

**Symptoms**: "Table 'todo_db.todos' doesn't exist" error.

**Solutions**:
```bash
cd todo-backend
mysql -u root -p todo_db < database/schema.sql
```

### Issue: Port 3000 Already in Use

**Symptoms**: Backend fails to start, port 3000 in use.

**Solutions**:
1. Find process using port 3000: `lsof -i :3000`
2. Kill the process: `kill -9 <PID>`
3. Or change port in `.env`: `PORT=3001`

## Security Best Practices

1. **Never Commit .env File**: Ensure `.env` is in `.gitignore`
2. **Use Strong Passwords**: Use complex passwords for database users
3. **Create Dedicated User**: Don't use root user in production
4. **Limit Privileges**: Grant only necessary permissions to database users
5. **Regular Backups**: Set up regular database backups
6. **Environment Variables**: Always use environment variables, never hardcode credentials

## Alternative: Using MySQL Workbench (GUI Tool)

If you prefer a graphical interface:

1. **Download MySQL Workbench**:
   - Visit: https://dev.mysql.com/downloads/workbench/
   - Download macOS version
   - Install the application

2. **Create Connection**:
   - Open MySQL Workbench
   - Click "+" to add new connection
   - Configure:
     - Connection Name: `Local MySQL`
     - Hostname: `localhost`
     - Port: `3306`
     - Username: `root`
     - Password: (click "Store in Keychain" and enter password)
   - Click "Test Connection" to verify
   - Click "OK" to save

3. **Run SQL Scripts**:
   - Connect to the server
   - Select `todo_db` database
   - File > Run SQL Script
   - Select `database/schema.sql`
   - Execute script

4. **Manage Database**:
   - View tables, data, and structure
   - Run queries visually
   - Manage users and permissions

## Next Steps

After successful setup:

1. ✅ Test creating todos through the frontend
2. ✅ Verify todos are saved in database: `SELECT * FROM todos;`
3. ✅ Test updating todo completion status
4. ✅ Test deleting todos
5. ✅ Verify all CRUD operations work end-to-end

## Database Schema Reference

The `todos` table structure:

| Column      | Type        | Constraints           |
|-------------|-------------|-----------------------|
| id          | INT         | PRIMARY KEY, AUTO_INCREMENT |
| title       | VARCHAR(255)| NOT NULL              |
| description | TEXT        | NULL                  |
| completed   | BOOLEAN     | DEFAULT FALSE         |
| created_at  | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP |
| updated_at  | TIMESTAMP   | ON UPDATE CURRENT_TIMESTAMP |

**Indexes**:
- `idx_completed` on `completed` column
- `idx_created_at` on `created_at` column

## Support

If you encounter issues not covered in this guide:

1. Check MySQL error logs: `/usr/local/var/mysql/*.err`
2. Check backend console for detailed error messages
3. Verify all prerequisites are installed
4. Ensure MySQL service is running
5. Double-check all credentials in `.env` file

---

**Last Updated**: January 2025
**MySQL Version**: 8.0+ (compatible)
**Backend**: Express.js with mysql2
