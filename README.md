# MediCore — Hospital, Appointment & Patient Care Management

A full-stack educational hospital operations platform using Next.js, Express, PostgreSQL/Prisma, and FastAPI. It uses synthetic/demo data only and is not intended for real patient records or production clinical use.

## Features in this starter
- Role-aware dashboard (patient, receptionist, doctor, nurse, lab technician, billing officer, administrator)
- JWT login and server-side role checks
- Patient registration/listing, appointment booking/listing, encounter creation, lab orders, invoices, consent records, audit events
- PostgreSQL schema with relational constraints and indexes
- FastAPI operational analytics endpoints (appointment status counts and lab turnaround summaries)
- Docker Compose, health checks, Vitest/Supertest-ready API test setup, Pytest, OpenAPI, CI workflow

> Scope note: This repository is a runnable foundation and demonstrates the core workflows. It does **not** claim all 15 assessment exercises are production-complete. Real FHIR server exchange, SMS/email delivery, payment processing, advanced refresh-token revocation, full clinical workflows, production deployment, backup/restore evidence, and incident simulation require environment-specific configuration and further implementation. External integrations are clearly left as adapters/stubs.

## Architecture

```text
Browser → Next.js UI → Express REST API → PostgreSQL
                              │
                              ├── audit events
                              └── FastAPI analytics service
```

Express owns authoritative business data. FastAPI receives aggregate/demo payloads for analytics and does not own clinical records.

## Quick start (Docker)
1. Copy `.env.example` to `.env` and change the demo secrets.
2. Run `docker compose up --build`.
3. API: http://localhost:4000/api/health
4. Frontend: http://localhost:3000
5. Analytics: http://localhost:8000/docs
6. API docs: http://localhost:4000/api-docs

The API container runs Prisma migrations and seeds synthetic demo users on startup.

### Demo accounts
All seeded accounts use password `DemoPass123!`.

| Role | Email |
|---|---|
| Administrator | admin@medicore.local |
| Doctor | doctor@medicore.local |
| Receptionist | reception@medicore.local |
| Patient | patient@medicore.local |
| Nurse | nurse@medicore.local |
| Lab technician | lab@medicore.local |
| Billing officer | billing@medicore.local |

Use synthetic records only. Change credentials before any shared demo.

## Local development
### Backend
```bash
cd backend
cp ../.env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Analytics
```bash
cd analytics
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Tests
```bash
cd backend && npm install && npm test
cd analytics && pip install -r requirements.txt && pytest
```

## Main API routes
- `POST /api/auth/login`
- `GET, POST /api/patients`
- `GET, POST /api/appointments`
- `POST /api/encounters`
- `POST /api/lab-orders`
- `POST /api/invoices`
- `POST /api/consents`
- `GET /api/audit` (administrator only)
- `GET /api/health`

Protected routes require `Authorization: Bearer <token>`. Role and patient-record checks are performed on the server. API errors use `{ "error": { "message", "requestId" } }`.

## Assessment mapping
1. Role-aware UI: `frontend/` and backend role middleware.
2. Hospital APIs: `backend/src/routes/`.
3. Relational data model: `backend/prisma/schema.prisma`.
4. Security/audit: `backend/src/middleware/`, `backend/src/lib/audit.js`.
5–6. Processing and analytics: `analytics/`.
7. Appointment conflict checks: `backend/src/routes/appointments.js`.
8. FHIR/notifications: documented integration boundary; sandbox adapter still to be connected.
9. Containers: `Dockerfile*`, `docker-compose.yml`.
10–11. Git workflow/CI: `.github/workflows/ci.yml` (branch protection must be enabled in GitHub settings).
12. Privacy and workflow tests: `backend/tests/` and `analytics/tests/`; extend with full cross-patient test matrix.
13. API docs: Swagger at `/api-docs`.
14. Deployment: deployment checklist in `docs/DEPLOYMENT.md`; HTTPS, secrets, backups and monitoring must be configured by the deployer.
15. Incident simulation: template in `docs/INCIDENT-REPORT-TEMPLATE.md`.

## Security and responsible use
- Synthetic data only. No real patient data, payment credentials, identity documents, or production secrets.
- Set a long random `JWT_SECRET`; never commit `.env`.
- Use HTTPS, private database networking, managed secrets, backups, monitoring, and a security/privacy review before any real deployment.
- This educational project is not a medical device, clinical decision support system, or compliance certification.

## GitHub publishing
Create an empty repository named `medicore-hospital-management` in your GitHub account, then run from this folder:
```bash
git init
git add .
git commit -m "Initial MediCore hospital management platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/medicore-hospital-management.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username. The final repository URL will be `https://github.com/YOUR-USERNAME/medicore-hospital-management`.
