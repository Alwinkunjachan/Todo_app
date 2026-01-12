# Todo Backend API

Express.js backend API for the Todo Application with MySQL database.

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Set up MySQL database**:
   - See [database-setup-guide.md](./database-setup-guide.md) for detailed instructions
   - Or run the automated setup script:
   ```bash
   ./setup-database.sh
   ```

3. **Configure environment variables**:
```bash
cp ENV_TEMPLATE.txt .env
# Edit .env with your actual MySQL credentials
```

4. **Start server**:
```bash
npm start
# or for development with auto-reload
npm run dev
```

## Database Setup

For complete database setup instructions, see:
- **[database-setup-guide.md](./database-setup-guide.md)** - Comprehensive step-by-step guide
- **[setup-database.sh](./setup-database.sh)** - Automated setup script

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Project Structure

```
todo-backend/
├── controllers/       # Request handlers
├── database/         # Database connection and schema
├── routes/           # API routes
├── server.js         # Express app entry point
└── .env              # Environment variables (create from ENV_TEMPLATE.txt)
```

## Environment Variables

Required environment variables (in `.env` file):
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - Database host (default: localhost)
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (default: todo_db)
- `DB_PORT` - Database port (default: 3306)
