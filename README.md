# CampusConnect – Placement & Training Portal

A web-based Placement and Training Portal that helps students explore placement opportunities, register, log in, apply for company recruitment drives, and track their application history.

## 🌐 Live Demo

- **Live Website:** https://placement-training-portal-3s0q.onrender.com
- **GitHub Repository:** https://github.com/adityadarade14/Placement-Training-Portal

## 📌 Project Overview

CampusConnect is a web application developed to simplify the campus placement process. Students can register, log in, view company recruitment information, apply for opportunities, and track their applications.

This project also demonstrates DevOps practices by implementing Continuous Integration (CI), automated testing, containerization, container security scanning, and container image publishing.

## 🎯 Objectives

- Provide a centralized platform for placement information.
- Allow students to register and log in.
- Display company details and job opportunities.
- Enable students to apply for available opportunities.
- Track application history.
- Implement CI using GitHub Actions and Jenkins.
- Containerize the application using Docker.
- Perform automated testing and security scanning.

## ✨ Application Features

- Student Registration
- Student Login
- Student Dashboard
- Company Listings
- Job Role and Package Information
- Application Submission
- Duplicate Application Prevention
- Application History
- REST API Integration

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js |
| Framework | Express.js |
| Data Storage | JSON Files |
| Version Control | Git |
| Code Hosting | GitHub |
| CI | GitHub Actions |
| CI/CD Pipeline | Jenkins |
| Code Quality | ESLint |
| Automated Testing | Jest, Supertest |
| Containerization | Docker |
| Container Orchestration | Docker Compose |
| Security Scanning | Trivy |
| Container Registry | GitHub Container Registry (GHCR) |
| Deployment | Render |

## 📂 Project Structure

```text
Placement-Training-Portal/
│
├── Backend/
│   └── server.js
│
├── Frontend/
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
├── Data/
│   ├── students.json
│   ├── companies.json
│   └── applications.json
│
├── tests/
│   └── api.test.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── compose.yaml
├── Jenkinsfile
├── eslint.config.mjs
├── jest.config.js
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js 20 or later
- npm
- Git
- Visual Studio Code
- Docker Desktop

### Step 1: Clone Repository

```bash
git clone https://github.com/adityadarade14/Placement-Training-Portal.git
```

### Step 2: Open Project Folder

```bash
cd Placement-Training-Portal
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Application

```bash
npm start
```

### Step 5: Open in Browser

```text
http://localhost:3000
```

## 🔗 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/status` | Check server status |
| POST | `/api/register` | Register a student |
| POST | `/api/login` | Student login |
| GET | `/api/companies` | Get company details |
| POST | `/api/apply` | Submit an application |
| GET | `/api/applications/:studentId` | View application history |

## 🚀 DevOps Implementation

### 1. Git and GitHub

Git is used for version control, while GitHub stores the project source code and manages project changes through branches and commits.

### 2. GitHub Actions – Continuous Integration

GitHub Actions automates the CI workflow when code is pushed or a pull request is created for the configured branch.

The workflow includes:

- Repository checkout
- Node.js setup
- Dependency installation
- Backend syntax checking
- Frontend syntax checking
- ESLint code quality checks
- Jest automated tests

Workflow location:

```text
.github/workflows/ci.yml
```

### 3. Jenkins Pipeline

Jenkins is used to automate the CI pipeline.

The Jenkins pipeline performs:

- Source code checkout from GitHub
- Dependency installation using npm
- ESLint code quality checks
- Jest automated testing
- Backend syntax validation
- Frontend syntax validation

Pipeline configuration:

```text
Jenkinsfile
```

### 4. ESLint – Code Quality

ESLint is used to identify JavaScript coding errors and maintain code quality.

Run the lint command:

```bash
npm run lint
```

### 5. Jest and Supertest – Automated Testing

Jest and Supertest are used to test backend REST API endpoints.

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### 6. Docker – Containerization

Docker is used to package the application and its dependencies into a container.

The project uses a multi-stage Dockerfile to create the application image.

Build Docker image:

```bash
docker build -t placement-portal .
```

Run Docker container:

```bash
docker run -d -p 3000:3000 --name placement-portal placement-portal
```

Open:

```text
http://localhost:3000
```

### 7. Docker Compose

Docker Compose is used to build and run the application using the `compose.yaml` configuration file.

Start application:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

Stop application:

```bash
docker compose down
```

### 8. Trivy – Container Security Scanning

Trivy is used to scan the Docker image for known security vulnerabilities.

Example scan command:

```bash
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image placement-portal:latest
```

### 9. GitHub Container Registry (GHCR)

GitHub Container Registry is used to store and publish the Docker image.

Login:

```bash
docker login ghcr.io -u YOUR_GITHUB_USERNAME
```

Tag image:

```bash
docker tag placement-portal:latest ghcr.io/YOUR_GITHUB_USERNAME/placement-portal:latest
```

Push image:

```bash
docker push ghcr.io/YOUR_GITHUB_USERNAME/placement-portal:latest
```

Pull image:

```bash
docker pull ghcr.io/YOUR_GITHUB_USERNAME/placement-portal:latest
```

**Published image:** `ghcr.io/adityadarade14/placement-portal:latest`

## 🧪 Testing

The following functionalities are covered in project testing:

- Student registration
- Login with valid credentials
- Login with invalid credentials
- Company listing API
- Application submission
- Duplicate application prevention
- Backend status API
- ESLint code quality checks
- Jest automated tests
- Docker container execution
- Docker Compose execution
- API smoke testing
- Container security scanning

### API Smoke Test

Check backend status:

```powershell
Invoke-RestMethod http://localhost:3000/api/status
```

Expected response:

```text
Backend is running successfully!
```

## 🔄 Rollback Demonstration

The project demonstrates a basic Docker image rollback approach by retaining a previous image tag and running the previous version when required.

Example:

```bash
docker tag placement-portal:latest placement-portal:v1
```

Run the previous image:

```bash
docker run -d -p 3000:3000 --name placement-portal-v1 placement-portal:v1
```

Verify backend:

```text
http://localhost:3000/api/status
```

## 🔮 Future Scope

- Admin dashboard for placement officers
- Resume upload functionality
- Email notifications
- Advanced search and filtering
- Eligibility verification
- Database integration using MySQL or MongoDB
- Secure server-side session management
- Analytics and placement reports
- Cloud-based automated deployment

## ⚠️ Project Limitations

- JSON files are used for demonstration data storage.
- Sample company information is provided for academic demonstration and does not represent verified job vacancies.
- The current authentication system is a basic academic implementation, not production-grade authentication.
- Persistent storage on the hosting platform is not guaranteed without a persistent disk or external database.
- Linux VM-based SSH deployment and Kubernetes orchestration are not included in the current implementation.

## 👨‍💻 Developer

**Name:** Aditya Shekhar Darade  
**Branch:** Information Technology  
**College:** D. Y. Patil College of Engineering, Akurdi, Pune

## 📄 License

This project is developed for educational and academic purposes.

---

**CampusConnect – Connecting Students with Placement Opportunities.**
