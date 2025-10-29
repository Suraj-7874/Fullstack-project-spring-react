Assignment: Spring Boot (Java) + React (Bootstrap)

Backend: Spring Boot 3, MySQL, JWT auth, role-based access, Task CRUD, Swagger.
Frontend: React + Bootstrap, Register/Login, protected Dashboard with Task CRUD.

Prerequisites
- Java 17
- Node.js 18+
- MySQL server (create DB `assignment` or use env vars)

Backend Setup
1) Configure MySQL (or use env vars):
   - DB_URL=jdbc:mysql://localhost:3306/assignment?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   - DB_USERNAME=root
   - DB_PASSWORD=root
   - JWT_SECRET=replace-with-strong-secret

2) Build & Run (from `backend/`):
   - mvn spring-boot:run
   - API base: http://localhost:8080/api/v1

Swagger
- http://localhost:8080/swagger-ui.html

Auth Endpoints
- POST /api/v1/auth/register { email, password, role?: USER|ADMIN }
- POST /api/v1/auth/login { email, password }

Task Endpoints (JWT required)
- GET /api/v1/tasks
- POST /api/v1/tasks { title, description?, completed? }
- PUT /api/v1/tasks/{id}
- DELETE /api/v1/tasks/{id}

Frontend Setup (from `frontend/`)
- npm start
- Default API base: http://localhost:8080/api/v1 (set REACT_APP_API_BASE if different)

Scalability Notes
- Modular services (auth, tasks) ready to split to microservices
- Caching with Redis for frequent reads (e.g., task lists)
- Centralized logging/metrics (ELK/Prometheus+Grafana)
- Stateless app instances behind a load balancer; DB with read replicas
- Containerize with Docker and orchestrate via Docker Compose/Kubernetes

Docker (optional)
- Provided `Dockerfile` for both backend and frontend and `docker-compose.yml`.
- Run: `docker compose up --build`
- Services:
  - MySQL: localhost:3306 (root/root), DB: assignment
  - Backend: http://localhost:8080
  - Frontend: http://localhost:3000


