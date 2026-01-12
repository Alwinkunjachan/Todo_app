#!/bin/bash

# MySQL Database Setup Script for Todo Application
# This script helps automate the database setup process

echo "=========================================="
echo "Todo App - MySQL Database Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if MySQL is installed
echo "Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}MySQL is not installed.${NC}"
    echo "Please install MySQL first:"
    echo "  brew install mysql"
    echo "  brew services start mysql"
    exit 1
fi

echo -e "${GREEN}✓ MySQL is installed${NC}"
echo ""

# Check if MySQL is running
echo "Checking if MySQL service is running..."
if brew services list | grep -q "mysql.*started"; then
    echo -e "${GREEN}✓ MySQL service is running${NC}"
else
    echo -e "${YELLOW}⚠ MySQL service is not running${NC}"
    echo "Starting MySQL service..."
    brew services start mysql
    sleep 3
    if brew services list | grep -q "mysql.*started"; then
        echo -e "${GREEN}✓ MySQL service started${NC}"
    else
        echo -e "${RED}✗ Failed to start MySQL service${NC}"
        exit 1
    fi
fi
echo ""

# Prompt for MySQL root password
echo "Enter MySQL root password:"
read -s MYSQL_PASSWORD

# Test connection
echo ""
echo "Testing MySQL connection..."
mysql -u root -p"$MYSQL_PASSWORD" -e "SELECT 1;" &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to connect to MySQL${NC}"
    echo "Please check your password and try again."
    exit 1
fi

echo -e "${GREEN}✓ MySQL connection successful${NC}"
echo ""

# Create database
echo "Creating database 'todo_db'..."
mysql -u root -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS todo_db;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database 'todo_db' created or already exists${NC}"
else
    echo -e "${RED}✗ Failed to create database${NC}"
    exit 1
fi
echo ""

# Run schema
echo "Running database schema..."
if [ -f "database/schema.sql" ]; then
    mysql -u root -p"$MYSQL_PASSWORD" todo_db < database/schema.sql 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Schema executed successfully${NC}"
    else
        echo -e "${RED}✗ Failed to execute schema${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ Schema file not found: database/schema.sql${NC}"
    exit 1
fi
echo ""

# Verify table creation
echo "Verifying table creation..."
TABLE_EXISTS=$(mysql -u root -p"$MYSQL_PASSWORD" todo_db -e "SHOW TABLES LIKE 'todos';" 2>/dev/null | grep -c "todos")
if [ "$TABLE_EXISTS" -eq 1 ]; then
    echo -e "${GREEN}✓ Table 'todos' created successfully${NC}"
else
    echo -e "${RED}✗ Table 'todos' not found${NC}"
    exit 1
fi
echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$MYSQL_PASSWORD
DB_NAME=todo_db
DB_PORT=3306
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please review and update .env file if needed${NC}"
else
    echo -e "${YELLOW}⚠ .env file already exists. Please update it manually with your credentials.${NC}"
fi
echo ""

echo "=========================================="
echo -e "${GREEN}Database setup completed successfully!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Review the .env file and update if needed"
echo "2. Start the backend server: npm start"
echo "3. Verify connection in the console output"
echo ""
