# Assessment tracker

| # | Assessment | Starter evidence | Remaining work |
|---|---|---|---|
| 01 | Role-based frontend | Role-aware login/dashboard | Separate complete experiences per role; UI tests |
| 02 | Hospital APIs | Patient, appointment, encounter, lab, billing, consent routes | Complete provider schedules, prescriptions, full validation matrix |
| 03 | Clinical relational DB | Prisma schema and relations | Add migration history, constraints and ER diagram |
| 04 | Clinical data security | JWT, RBAC, patient list scoping, audit hooks | Resource-level policies for every endpoint, consent enforcement, refresh/revocation |
| 05 | Python processing | Typed analytics payload validation | CSV import, unit/reference metadata validation, benchmark |
| 06 | FastAPI analytics | Utilization/wait/turnaround summary | Population reporting and benchmark evidence |
| 07 | Workflow engine | Overlap rejection and appointment states | Time-zone policy, waitlist, cancellations, lifecycle state machine |
| 08 | Interoperability | FHIR boundary documented | Connect test FHIR server and notification sandbox; verify webhooks |
| 09 | Docker | Compose services, DB healthcheck | Non-root images, worker, hardened runtime |
| 10 | Git/change review | Git-ready repo | Branch protection, PR templates, reviewer evidence |
| 11 | CI/CD | GitHub Actions test workflow | Scanning, build/publish, staging, approvals, deploy evidence |
| 12 | Privacy/workflow tests | Basic API/analytics tests | Collision, consent, cross-patient, invalid order and failure-path suites |
| 13 | API docs | Swagger UI and OpenAPI starter | Document all schemas, errors, examples; Postman export |
| 14 | Secure deployment | Deployment checklist | HTTPS, secret store, backups/restore, monitoring evidence |
| 15 | Incident simulation | Incident report template | Run controlled incidents and attach logs, fixes and regression evidence |

Do not mark an assessment complete until implementation, tests, documentation, and demonstrable evidence exist.
