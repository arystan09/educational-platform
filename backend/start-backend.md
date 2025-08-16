# Backend Startup Guide

## Prerequisites
1. Node.js (v16 or higher)
2. PostgreSQL database
3. Docker (optional, for database)

## Environment Setup

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=education_platform

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3000

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Database Setup

### Option 1: Using Docker (Recommended)
```bash
# Start PostgreSQL with Docker
docker run --name education-db \
  -e POSTGRES_DB=education_platform \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:13
```

### Option 2: Local PostgreSQL
1. Install PostgreSQL
2. Create database: `createdb education_platform`
3. Update `.env` with your credentials

## Starting the Backend

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Courses
- `GET /courses` - Get all courses
- `POST /courses` - Create course (Admin only)
- `GET /courses/:id` - Get course details

### Admin
- `GET /admin/stats` - Get admin statistics

## Testing the API

You can test the API using curl or Postman:

```bash
# Register a new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "STUDENT"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

1. **Database connection error**: Check your PostgreSQL service and credentials
2. **Port already in use**: Change PORT in .env or kill the process using port 3000
3. **JWT errors**: Make sure JWT_SECRET is set in .env
4. **CORS errors**: The backend should handle CORS automatically, but you may need to configure it for production 