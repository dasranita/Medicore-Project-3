# Deployment checklist

This starter is for local/demo use. Before any internet-facing deployment:
- Provision managed PostgreSQL in a private network; do not expose its port publicly.
- Use HTTPS behind a reverse proxy/load balancer and configure secure headers/CORS allowlists.
- Store JWT/database credentials in a managed secret store; rotate them and never commit `.env`.
- Use a dedicated non-root runtime user, image scanning, dependency scanning, and pinned image digests.
- Configure encrypted automated backups and perform a documented restore drill.
- Add centralized structured logs, request correlation, metrics, alerting, and audit retention policies.
- Configure rate limits, session revocation/rotation, MFA for staff, and security review.
- Verify migrations in staging before production; use approval-gated releases.
- Run privacy, legal, clinical safety, and regulatory reviews. This repository is not a compliance certification.
