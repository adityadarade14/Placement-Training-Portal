# CampusConnect – Placement & Training Portal

A web-based Placement and Training Portal designed to help students explore placement opportunities, register, log in, and apply for company recruitment drives.

## 🌐 Live Demo

**Live Website:** https://placement-training-portal-3s0q.onrender.com

**GitHub Repository:** https://github.com/adityadarade14/Placement-Training-Portal

---

## 📌 Project Overview

CampusConnect is a web application developed to simplify the campus placement process. It provides a platform where students can register, log in, view company recruitment information, apply for opportunities, and track their application history.

The project also demonstrates DevOps practices through Git, GitHub, GitHub Actions, and Render deployment.

## 🎯 Objectives

- Provide a centralized platform for placement information.
- Allow students to register and log in.
- Display company details and job opportunities.
- Enable students to apply for available opportunities.
- Track application history.
- Implement a basic CI/CD pipeline.

## ✨ Features

- Student Registration
- Student Login
- Student Dashboard
- Company Listings
- Job Role and Package Information
- Application Submission
- Duplicate Application Prevention
- Application History
- REST API Integration
- Automated CI using GitHub Actions
- Cloud Deployment using Render

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
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- Git
- Visual Studio Code

### Step 1: Clone the Repository

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

### Step 4: Start the Server

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

Git is used for version control, and GitHub stores the project source code.

### 2. Continuous Integration (CI)

GitHub Actions automatically runs the workflow when code is pushed to the main branch or a pull request is created.

The workflow performs:
- Repository checkout
- Node.js setup
- Dependency installation
- Backend syntax checking
- Frontend JavaScript syntax checking

### 3. Continuous Deployment (CD)

Render is used to host the application online. GitHub updates trigger automatic redeployment through the connected repository.

**Deployment URL:** https://placement-training-portal-3s0q.onrender.com

## 🧪 Testing

The following functionalities should be tested:

- Student registration
- Login with valid credentials
- Login with invalid credentials
- Company listing
- Application submission
- Duplicate application prevention
- Application history
- Backend status API
- GitHub Actions workflow
- Live website availability

## 🔮 Future Scope

- Admin dashboard for placement officers
- Resume upload functionality
- Email notifications
- Advanced search and filtering
- Eligibility verification
- Database integration using MySQL or MongoDB
- Secure server-side session management
- Analytics and placement reports

## ⚠️ Project Limitations

- JSON files are used for demonstration data storage.
- Sample company information is provided for academic demonstration and does not represent verified job vacancies.
- The current authentication system is a basic academic implementation, not production-grade authentication.
- Persistent storage on the hosting platform is not guaranteed without a persistent disk or external database.

## 👨‍💻 Developer

**Name:** Aditya Shekhar Darade  
**Branch:** Information Technology  
**College:** D. Y. Patil College of Engineering, Akurdi, Pune

## 📄 License

This project is developed for educational and academic purposes.

---

**CampusConnect – Connecting Students with Placement Opportunities.**
