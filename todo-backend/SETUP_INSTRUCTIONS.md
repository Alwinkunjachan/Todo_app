# Quick Setup Instructions

## ✅ Completed Steps
1. ✅ `.env` file has been created from template
2. ✅ File structure is ready

## 🔧 Action Required: Add MySQL Password

The `.env` file has been created but you need to add your actual MySQL root password.

### Step 1: Edit .env File

Open the `.env` file in the `todo-backend/` directory and replace `your_mysql_root_password` with your actual MySQL password:

```bash
cd /Users/alwinkunjachan/Documents/GitHub/Todo_app/todo-backend
nano .env
# or
code .env
```

**Update this line:**
```env
DB_PASSWORD=your_mysql_root_password
```

**To:**
```env
DB_PASSWORD=your_actual_password_here
```

**Important:**
- No quotes around the password
- No spaces around the `=` sign
- Save the file after editing

### Step 2: Verify MySQL Password Works

Test your password:
```bash
mysql -u root -p
```

Enter your password when prompted. If it works, you'll see the MySQL prompt.

### Step 3: Ensure Database Exists

Create the database if it doesn't exist:
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS todo_db;"
```

Run the schema:
```bash
cd /Users/alwinkunjachan/Documents/GitHub/Todo_app/todo-backend
mysql -u root -p todo_db < database/schema.sql
```

### Step 4: Restart Backend

After updating the `.env` file with your password:
```bash
cd todo-backend
npm start
```

You should see:
```
✅ Database connected successfully
```

## Troubleshooting

If you don't remember your MySQL password:
1. Try common passwords you might have used
2. Or reset it using the instructions in `database-setup-guide.md`
3. Or create a new MySQL user for the application
