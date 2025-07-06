# Trading Bots Dashboard - Backend

A NestJS-based backend API for managing trading bots with JWT authentication, PostgreSQL database, and Prisma ORM.

## Prerequisites

Before running the backend, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for PostgreSQL database)
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd testtask/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the backend directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/nestjs_db?schema=public"

# JWT
JWT_SECRET="super-secret-jwt-key"
JWT_REFRESH_EXPIRES="24h"
JWT_ACCESS_EXPIRES="10M"
FRONTEND_URL='urltofrontend'
```

**Important:** Replace the JWT secrets with your own secure random strings in production.

### 4. Start PostgreSQL Database

The project includes a Docker Compose configuration for PostgreSQL:

```bash
# Start PostgreSQL database in detached mode
docker-compose up -d

# Check if the database is running
docker-compose ps
```

This will start a PostgreSQL database on `localhost:5432` with:
- Database: `nestjs_db`
- Username: `postgres`
- Password: `password`

### 5. Database Migration and Seeding

Generate Prisma client and run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database with initial data (5 public bots)
npx prisma db seed
```

### 6. Start the Development Server

```bash
# Start the NestJS development server
npm run start:dev
```

The backend API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Bots Management
- `GET /api/bots` - Get all bots (public + user's private bots)
- `POST /api/bots` - Create a new bot
- `PUT /api/bots/:id` - Update a bot
- `DELETE /api/bots/:id` - Delete a bot

### Statistics
- `GET /api/bots/statistics` - Get user's bot statistics

## Database Schema

The application uses the following main entities:

- **User** - User accounts with authentication
- **Bot** - Trading bots (can be public or private)
- **BotStatistic** - Trading statistics for bots

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

## Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Seed database
npx prisma db seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Docker Commands

```bash
# Start PostgreSQL database
docker-compose up -d

# Stop PostgreSQL database
docker-compose down

# View database logs
docker-compose logs postgres

# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d nestjs_db
```

## Troubleshooting

### Database Connection Issues

1. **Check if PostgreSQL is running:**
   ```bash
   docker-compose ps
   ```

2. **Restart the database:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

3. **Check database logs:**
   ```bash
   docker-compose logs postgres
   ```

### Prisma Issues

1. **Regenerate Prisma client:**
   ```bash
   npx prisma generate
   ```

2. **Reset database (development only):**
   ```bash
   npx prisma migrate reset
   ```

### Port Already in Use

If port 3001 is already in use, either:
1. Change the `PORT` in your `.env` file
2. Kill the process using the port:
   ```bash
   sudo lsof -i :3001
   sudo kill -9 <PID>
   ```

## Production Deployment

For production deployment:

1. Set secure environment variables
2. Use a managed PostgreSQL service
3. Build the application: `npm run build`
4. Start with: `npm run start:prod`

## Architecture

- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT with refresh tokens
- **Validation:** class-validator and class-transformer
- **API Documentation:** Built-in Swagger support

## Security Features

- JWT authentication with access and refresh tokens
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Request rate limiting (can be added)

## License

This project is for educational/demonstration purposes.
