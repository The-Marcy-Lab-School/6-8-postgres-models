# 6-8 Postgres Models

Lecture code for [Postgres Models](https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-6-databases/8-postgres-models).

This repo demonstrates building a user management system backed by Postgres — registration, login, and basic CRUD on users.

> **Note:** The update and delete endpoints have no authorization checks. Any request can modify or delete any user. Lesson 12 fixes this with authorization middleware.

> **Note:** Passwords are stored in plaintext. Lesson 9 fixes this with bcrypt.

## Setup

```sh
# cd into server
cd server

# Install dependencies
npm install

# Edit db/pool.js and update the user and password fields to match your local Postgres setup
# (On macOS you may be able to delete those fields entirely)

# Create the database (run once)
createdb users_db           # Mac
# sudo -u postgres createdb users_db   # Windows/WSL

# Initialize the schema
psql -f db/seed.sql                    # Mac
sudo -u postgres psql -f db/seed.sql   # Windows/WSL

# Start the server
npm run dev
```

## Files

- `index.js` — Express app with auth and user routes
- `db/pool.js` — connection pool (edit this to match your local Postgres setup)
- `db/seed.sql` — creates the `users` table and seeds sample data
- `models/userModel-in-memory.js` — in-memory User model (the starting point)
- `models/userModel.js` — Postgres User model (TODOs — fill this in!)
- `models/userModel-solution.js` — complete Postgres solution (instructor reference)
- `controllers/authControllers.js` — `register` and `login` handlers
- `controllers/userControllers.js` — `listUsers`, `updateUser`, `deleteUser` handlers

## The Model Swap

The controllers currently import `userModel-in-memory`. Once you've implemented `userModel.js`, swap the import in both controller files:

```js
// Before (in-memory)
const userModel = require('../models/userModel-in-memory');

// After (Postgres) — same interface, different internals
const userModel = require('../models/userModel');
```

The controllers and routes don't change at all — that's the point.

## API Routes

### Auth

| Method | Path                 | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Create a new user |
| POST   | `/api/auth/login`    | Log in            |

```sh
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "charlie", "password": "password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "charlie", "password": "password123"}'

# Login with wrong password (expect 401)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "charlie", "password": "wrongpassword"}'

# Register a new user but the username is taken
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "charlie", "password": "password123"}'
```

### Users

| Method | Path                  | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/api/users`          | List all users    |
| PATCH  | `/api/users/:user_id` | Update a password |
| DELETE | `/api/users/:user_id` | Delete a user     |

```sh
# List all users
curl http://localhost:3000/api/users

# Update a user's password
curl -X PATCH http://localhost:3000/api/users/3 \
  -H "Content-Type: application/json" \
  -d '{"password": "newpassword"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/3
```
