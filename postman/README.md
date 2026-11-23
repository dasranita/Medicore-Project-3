# Postman quick test

Base URL: `http://localhost:4000`
1. `GET /api/health` (no auth)
2. `POST /api/auth/login` with `{ "email": "admin@medicore.local", "password": "DemoPass123!" }`
3. Copy `token` and set `Authorization: Bearer <token>` for protected routes.
4. `GET /api/patients`
5. `POST /api/patients` with `{ "fullName": "Synthetic Test Patient", "email": "synthetic@example.test" }`

Swagger UI at `/api-docs`. Do not use real patient information.
