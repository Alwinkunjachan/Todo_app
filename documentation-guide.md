# Todo Application - User Documentation

Welcome to the Todo Application! This guide provides everything you need to know to use and set up the application.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Quick Start Guide](#quick-start-guide)
4. [Installation](#installation)
5. [Using the Application](#using-the-application)
6. [API Documentation](#api-documentation)
7. [Configuration](#configuration)
8. [Troubleshooting](#troubleshooting)
9. [FAQ](#faq)
10. [Support](#support)

---

## Introduction

The Todo Application is a full-stack web application that helps you manage your tasks efficiently. It provides a clean, modern interface for creating, organizing, and tracking your todos.

### What is This Application?

A simple yet powerful todo management system that allows you to:
- Create and manage your tasks
- Track completion status
- Filter todos by status
- Organize your daily activities

### Technology Stack

- **Frontend**: Angular 14 - Modern web framework
- **Backend**: Express.js - RESTful API server
- **Database**: MySQL - Reliable data storage

---

## Features

### Core Features

1. **Create Todos**
   - Add new tasks with titles and descriptions
   - Todos are saved automatically

2. **View Todos**
   - See all your todos in one place
   - View creation and update timestamps

3. **Update Todos**
   - Mark todos as complete or incomplete
   - Update todo details

4. **Delete Todos**
   - Remove todos you no longer need
   - Confirmation dialog prevents accidental deletion

5. **Filter Todos**
   - View all todos
   - Filter by active (incomplete) todos
   - Filter by completed todos

6. **Real-time Updates**
   - Changes reflect immediately
   - No page refresh needed

### User Interface Features

- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface
- **Loading States**: Visual feedback during operations
- **Error Handling**: Clear error messages
- **Confirmation Dialogs**: Prevent accidental actions

---

## Quick Start Guide

### Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v14.x or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MySQL** (v8.0 or higher)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or install via Homebrew: `brew install mysql`

### Quick Setup (5 Minutes)

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Todo_app
   ```

2. **Set Up Database**
   ```bash
   cd todo-backend
   ./setup-database.sh
   # Or follow manual setup in Installation section
   ```

3. **Configure Backend**
   ```bash
   cp ENV_TEMPLATE.txt .env
   # Edit .env with your MySQL credentials
   ```

4. **Install Dependencies**
   ```bash
   # Backend
   cd todo-backend
   npm install

   # Frontend
   cd ../todo-frontend
   npm install
   ```

5. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   cd todo-backend
   npm start

   # Terminal 2 - Frontend
   cd todo-frontend
   npm start
   ```

6. **Access the Application**
   - Open browser: `http://localhost:4200`
   - You should see the Todo Application interface

---

## Installation

### Step 1: Install Prerequisites

#### Install Node.js

**macOS/Linux**:
```bash
# Using Homebrew (macOS)
brew install node

# Or download from nodejs.org
```

**Windows**:
- Download installer from https://nodejs.org/
- Run installer and follow wizard

**Verify Installation**:
```bash
node --version  # Should show v14.x or higher
npm --version   # Should show v6.x or higher
```

#### Install MySQL

**macOS (Homebrew)**:
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

**Windows**:
- Download MySQL Installer from https://dev.mysql.com/downloads/installer/
- Run installer and follow setup wizard
- Note your root password

**Verify Installation**:
```bash
mysql --version
```

### Step 2: Set Up Database

#### Option A: Automated Setup (Recommended)

```bash
cd todo-backend
chmod +x setup-database.sh
./setup-database.sh
```

This script will:
- Check MySQL installation
- Verify MySQL service is running
- Create database
- Run schema
- Guide you through .env setup

#### Option B: Manual Setup

1. **Start MySQL**:
   ```bash
   # macOS
   brew services start mysql

   # Linux
   sudo systemctl start mysql

   # Windows - MySQL should start automatically
   ```

2. **Create Database**:
   ```bash
   mysql -u root -p

   # In MySQL prompt:
   CREATE DATABASE IF NOT EXISTS todo_db;
   exit;
   ```

3. **Run Schema**:
   ```bash
   cd todo-backend
   mysql -u root -p todo_db < database/schema.sql
   ```

4. **Verify Setup**:
   ```bash
   mysql -u root -p todo_db -e "SHOW TABLES;"
   ```

### Step 3: Configure Backend

1. **Create .env File**:
   ```bash
   cd todo-backend
   cp ENV_TEMPLATE.txt .env
   ```

2. **Edit .env File**:
   ```bash
   nano .env
   # or
   code .env
   ```

3. **Update Credentials**:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_root_password
   DB_NAME=todo_db
   DB_PORT=3306
   ```

   **Important**: Replace `your_mysql_root_password` with your actual MySQL root password.

### Step 4: Install Dependencies

#### Backend Dependencies

```bash
cd todo-backend
npm install
```

This installs:
- express
- cors
- dotenv
- mysql2
- nodemon (dev dependency)

#### Frontend Dependencies

```bash
cd todo-frontend
npm install
```

This installs:
- Angular core packages
- RxJS
- TypeScript
- Development tools

### Step 5: Start the Application

#### Start Backend Server

**Terminal 1**:
```bash
cd todo-backend
npm start
```

Expected output:
```
🚀 Server is running on http://localhost:3000
📝 Environment: development
🗄️  Database: todo_db
✅ Database connected successfully
```

#### Start Frontend Server

**Terminal 2**:
```bash
cd todo-frontend
npm start
```

Expected output:
```
** Angular Live Development Server is listening on localhost:4200 **
```

#### Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

You should see the Todo Application interface!

---

## Using the Application

### Creating a Todo

1. **Enter Todo Title**
   - Type in the "Title" field (required, minimum 3 characters)
   - The field will show an error if invalid

2. **Enter Description** (Optional)
   - Add additional details in the "Description" field
   - This field is optional

3. **Click "Add Todo"**
   - The todo will be created and appear in the list below
   - A success message will be displayed

### Viewing Todos

- **All Todos**: Click "All" button to see all todos
- **Active Todos**: Click "Active" to see only incomplete todos
- **Completed Todos**: Click "Completed" to see only completed todos

Todos are displayed with:
- Title and description
- Creation timestamp
- Completion status checkbox

### Updating a Todo

1. **Mark as Complete/Incomplete**
   - Click the checkbox next to a todo
   - The status updates immediately
   - Completed todos are visually distinct

2. **Update Todo Details** (Future Feature)
   - Currently, you can only toggle completion status
   - Full edit functionality coming soon

### Deleting a Todo

1. **Click Delete Button**
   - Click the trash icon (🗑️) next to a todo

2. **Confirm Deletion**
   - A confirmation dialog will appear
   - Click "Delete" to confirm or "Cancel" to abort

3. **Todo Removed**
   - The todo is permanently deleted from the database

### Filtering Todos

Use the filter buttons at the top of the todo list:

- **All**: Shows all todos (default)
- **Active**: Shows only incomplete todos
- **Completed**: Shows only completed todos

The active filter is highlighted, and the list updates immediately.

---

## API Documentation

The backend provides a RESTful API for todo operations. All endpoints are prefixed with `/api`.

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### Health Check

```http
GET /api/health
```

**Response**:
```json
{
  "status": "OK",
  "message": "Todo API is running",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

#### Get All Todos

```http
GET /api/todos
```

**Response**:
```json
[
  {
    "id": 1,
    "title": "Learn Angular",
    "description": "Complete Angular tutorial",
    "completed": false,
    "created_at": "2025-01-15T10:00:00.000Z",
    "updated_at": "2025-01-15T10:00:00.000Z"
  }
]
```

#### Get Single Todo

```http
GET /api/todos/:id
```

**Example**: `GET /api/todos/1`

**Response** (Success):
```json
{
  "id": 1,
  "title": "Learn Angular",
  "description": "Complete Angular tutorial",
  "completed": false,
  "created_at": "2025-01-15T10:00:00.000Z",
  "updated_at": "2025-01-15T10:00:00.000Z"
}
```

**Response** (Not Found):
```json
{
  "error": {
    "message": "Todo not found",
    "status": 404
  }
}
```

#### Create Todo

```http
POST /api/todos
Content-Type: application/json

{
  "title": "New Todo",
  "description": "Optional description",
  "completed": false
}
```

**Response** (Success):
```json
{
  "id": 2,
  "title": "New Todo",
  "description": "Optional description",
  "completed": false,
  "created_at": "2025-01-15T10:30:00.000Z",
  "updated_at": "2025-01-15T10:30:00.000Z"
}
```

**Response** (Validation Error):
```json
{
  "error": {
    "message": "Title is required",
    "status": 400
  }
}
```

#### Update Todo

```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated Todo",
  "completed": true
}
```

**Note**: All fields are optional. Only provided fields will be updated.

**Response**:
```json
{
  "id": 1,
  "title": "Updated Todo",
  "description": "Original description",
  "completed": true,
  "created_at": "2025-01-15T10:00:00.000Z",
  "updated_at": "2025-01-15T10:35:00.000Z"
}
```

#### Delete Todo

```http
DELETE /api/todos/:id
```

**Example**: `DELETE /api/todos/1`

**Response**:
```json
{
  "message": "Todo deleted successfully",
  "deletedId": 1
}
```

### Testing API with curl

```bash
# Health check
curl http://localhost:3000/api/health

# Get all todos
curl http://localhost:3000/api/todos

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","description":"Test","completed":false}'

# Update todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/1
```

---

## Configuration

### Backend Configuration

Edit `todo-backend/.env` file:

```env
PORT=3000                    # Server port
NODE_ENV=development         # Environment (development/production)
DB_HOST=localhost           # Database host
DB_USER=root                # Database user
DB_PASSWORD=your_password   # Database password
DB_NAME=todo_db            # Database name
DB_PORT=3306               # Database port
```

### Frontend Configuration

Edit `todo-frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Backend API URL
};
```

For production, edit `environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'  // Production API URL
};
```

### Database Configuration

Database configuration is managed through the backend `.env` file. No separate database configuration file is needed.

---

## Troubleshooting

### Application Won't Start

#### Frontend Issues

**Problem**: Port 4200 already in use

**Solution**:
```bash
# Use a different port
ng serve --port 4201
```

**Problem**: Module not found errors

**Solution**:
```bash
cd todo-frontend
rm -rf node_modules package-lock.json
npm install
```

**Problem**: CORS errors in browser

**Solution**:
- Verify backend is running on port 3000
- Check API URL in `environment.ts`
- Ensure backend CORS is enabled (it should be by default)

#### Backend Issues

**Problem**: Port 3000 already in use

**Solution**:
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>

# Or change port in .env
PORT=3001
```

**Problem**: Database connection error

**Solution**:
1. Verify MySQL is running:
   ```bash
   brew services list  # macOS
   sudo systemctl status mysql  # Linux
   ```

2. Check credentials in `.env` file

3. Test connection:
   ```bash
   mysql -u root -p
   ```

4. Verify database exists:
   ```bash
   mysql -u root -p -e "SHOW DATABASES;"
   ```

**Problem**: Module not found

**Solution**:
```bash
cd todo-backend
rm -rf node_modules package-lock.json
npm install
```

#### Database Issues

**Problem**: MySQL not starting

**Solution**:
```bash
# macOS
brew services restart mysql

# Linux
sudo systemctl restart mysql

# Check logs
tail -f /usr/local/var/mysql/*.err  # macOS
sudo tail -f /var/log/mysql/error.log  # Linux
```

**Problem**: Access denied

**Solution**:
1. Verify username and password in `.env`
2. Test credentials: `mysql -u root -p`
3. Check user privileges:
   ```sql
   SHOW GRANTS FOR 'root'@'localhost';
   ```

**Problem**: Table doesn't exist

**Solution**:
```bash
cd todo-backend
mysql -u root -p todo_db < database/schema.sql
```

### Application Behavior Issues

**Problem**: Todos not saving

**Solution**:
- Check backend server is running
- Verify database connection in backend console
- Check browser console for errors
- Verify API URL in `environment.ts`

**Problem**: Changes not reflecting

**Solution**:
- Refresh the browser
- Check if backend server restarted
- Verify database connection
- Check browser console for errors

**Problem**: Filter not working

**Solution**:
- Clear browser cache
- Check browser console for JavaScript errors
- Verify frontend server is running

---

## FAQ

### General Questions

**Q: Do I need to install MySQL separately?**
A: Yes, MySQL must be installed and running. See Installation section for instructions.

**Q: Can I use a different database?**
A: Currently, the application is configured for MySQL. To use a different database, you would need to modify the backend code.

**Q: Is my data persistent?**
A: Yes, all todos are stored in the MySQL database and persist across application restarts.

**Q: Can I run this on Windows?**
A: Yes, the application works on Windows, macOS, and Linux. Installation steps may vary slightly.

**Q: Do I need internet connection?**
A: No, the application runs locally. You only need internet for initial installation (downloading packages).

### Technical Questions

**Q: What ports does the application use?**
A: 
- Frontend: Port 4200 (default)
- Backend: Port 3000 (default)
- MySQL: Port 3306 (default)

**Q: Can I change the ports?**
A: Yes:
- Frontend: `ng serve --port <port>`
- Backend: Change `PORT` in `.env` file
- MySQL: Change `DB_PORT` in `.env` file

**Q: How do I backup my todos?**
A: You can backup the MySQL database:
```bash
mysqldump -u root -p todo_db > backup.sql
```

**Q: How do I restore from backup?**
A:
```bash
mysql -u root -p todo_db < backup.sql
```

**Q: Can I use this in production?**
A: The application is suitable for development and small-scale use. For production, consider:
- Adding authentication
- Using HTTPS
- Setting up proper error logging
- Database backups
- Security hardening

### Feature Questions

**Q: Can I edit todo titles?**
A: Currently, you can only toggle completion status. Full edit functionality is planned for future releases.

**Q: Can I add categories or tags?**
A: Not in the current version. This feature may be added in future releases.

**Q: Can I set due dates?**
A: Not in the current version. This feature may be added in future releases.

**Q: Can multiple users use this?**
A: The current version doesn't have user authentication. All todos are shared. User accounts may be added in future releases.

---

## Support

### Getting Help

If you encounter issues:

1. **Check Troubleshooting Section**: Most common issues are covered
2. **Check Browser Console**: Look for JavaScript errors
3. **Check Backend Console**: Look for server errors
4. **Check Database**: Verify MySQL is running and accessible

### Reporting Issues

When reporting issues, please include:

1. **Operating System**: macOS, Windows, or Linux
2. **Node.js Version**: `node --version`
3. **MySQL Version**: `mysql --version`
4. **Error Messages**: From browser console and backend terminal
5. **Steps to Reproduce**: What you did before the error occurred

### Additional Resources

- **Development Guide**: See `development-guide.md` for technical details
- **Database Setup**: See `todo-backend/database-setup-guide.md` for detailed database setup
- **Backend README**: See `todo-backend/README.md` for backend-specific information

### Community

- Check the repository issues for known problems
- Review the code documentation
- Consult the development guide for technical details

---

## Application Information

**Version**: 1.0.0
**Last Updated**: January 2025
**License**: See LICENSE file in repository

**Technologies Used**:
- Angular 14.0.0
- Express.js 4.18.2
- MySQL 8.0+
- Node.js 14.x+

---

Thank you for using the Todo Application! We hope it helps you stay organized and productive.
