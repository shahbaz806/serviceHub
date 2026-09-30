# ServiceHub

ServiceHub is a full-stack service-booking platform for arranging trusted local help, including AC repair, electrical work, plumbing, cleaning, and appliance repair.

## Features

- Cookie-based JWT authentication with hashed passwords
- Browse, search, and filter services; view service details
- Book appointments, view personal bookings, and cancel eligible requests
- Profile editing and protected user routes
- Admin dashboard with metrics, service management, and booking status control
- Responsive React interface with loading, error, empty, validation, and toast states

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Security: bcrypt password hashing, JWTs in HTTP-only cookies, role middleware

## Setup

1. Install Node.js 18+ and MongoDB (local or hosted).
2. Copy `backend/.env.example` to `backend/.env`, then set `MONGODB_URI` and a long random `JWT_SECRET`.
3. Optionally copy `frontend/.env.example` to `frontend/.env` if the API is not on `http://localhost:5000/api`.
4. Install dependencies:

   ```bash
   npm run install:all
   ```

5. Seed the catalog and demo admin:

   ```bash
   npm run seed
   ```

6. Run the API and frontend together:

   ```bash
   npm run dev
   ```

The web app runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Environment variables

Backend (`backend/.env`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/servicehub
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Frontend (`frontend/.env`, optional):

```env
VITE_API_URL=http://localhost:5000/api
```

## API overview

- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET/PATCH /api/users/profile`
- `GET /api/services`, `GET /api/services/:id`; admins can `POST`, `PATCH`, and `DELETE`
- `POST /api/bookings`, `GET /api/bookings/my`, `PATCH /api/bookings/:id/cancel`
- Admins can `GET /api/bookings`, `PATCH /api/bookings/:id/status`, and `GET /api/admin/dashboard`

## Seed credentials

`admin@servicehub.local` / `Admin123!`

Change the seed password before using any non-development environment.
