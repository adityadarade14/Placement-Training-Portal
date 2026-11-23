
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

const frontendPath = path.join(__dirname, "../frontend");
const dataPath = path.join(__dirname, "../data");

const studentsFile = path.join(dataPath, "students.json");
const companiesFile = path.join(dataPath, "companies.json");
const applicationsFile = path.join(dataPath, "applications.json");

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

function createFile(file, defaultData) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
    }
}

createFile(studentsFile, []);
createFile(applicationsFile, []);

createFile(companiesFile, [
    {
        id: 1,
        name: "TCS",
        role: "Software Developer",
        location: "Pune",
        package: "3.5 - 7 LPA",
        eligibility: "BE / BTech",
        deadline: "30 December 2026",
        description: "Software development and testing.",
        skills: "Java, C++, Problem Solving"
    },
    {
        id: 2,
        name: "Infosys",
        role: "System Engineer",
        location: "Pune",
        package: "3.6 LPA",
        eligibility: "BE / BTech",
        deadline: "15 December 2026",
        description: "Develop and maintain software systems.",
        skills: "Programming, SQL"
    },
    {
        id: 3,
        name: "Wipro",
        role: "Project Engineer",
        location: "Mumbai",
        package: "3.5 LPA",
        eligibility: "BE / BTech",
        deadline: "20 December 2026",
        description: "Software development and testing.",
        skills: "Java, Python"
    },
    {
        id: 4,
        name: "Accenture",
        role: "Associate Software Engineer",
        location: "Pune",
        package: "4.5 LPA",
        eligibility: "BE / BTech",
        deadline: "10 January 2027",
        description: "Technology solutions and application development.",
        skills: "Java, Python"
    },
    {
        id: 5,
        name: "Capgemini",
        role: "Software Engineer",
        location: "Mumbai",
        package: "4 LPA",
        eligibility: "BE / BTech",
        deadline: "25 December 2026",
        description: "Application development projects.",
        skills: "C++, Java, Web Development"
    }
]);

app.use(express.json());
app.use(express.static(frontendPath));

function readData(file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function saveData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Status API
app.get("/api/status", (req, res) => {
    res.json({ message: "Backend is running successfully!" });
});

// Registration API
app.post("/api/register", (req, res) => {
    try {
        const { name, email, password, branch, year } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof branch !== "string" ||
            typeof year !== "string" ||
            !name.trim() || !email.trim() ||
            !password || !branch.trim() || !year.trim()
        ) {
            return res.status(400).json({ message: "Please fill all fields." });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must have at least 6 characters."
            });
        }

        const students = readData(studentsFile);
        const cleanEmail = email.trim().toLowerCase();

        if (students.some(s => s.email === cleanEmail)) {
            return res.status(409).json({
                message: "Email already registered."
            });
        }

        const salt = crypto.randomBytes(16).toString("hex");
        const passwordHash = crypto.scryptSync(
            password, salt, 64
        ).toString("hex");

        students.push({
            id: crypto.randomUUID(),
            name: name.trim(),
            email: cleanEmail,
            passwordHash,
            salt,
            branch: branch.trim(),
            year: year.trim()
        });

        saveData(studentsFile, students);

        res.status(201).json({
            message: "Registration successful! Please login."
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration server error." });
    }
});

// Login API
app.post("/api/login", (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() || !password
        ) {
            return res.status(400).json({
                message: "Enter email and password."
            });
        }

        const students = readData(studentsFile);

        const student = students.find(
            s => s.email === email.trim().toLowerCase()
        );

        if (!student) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const loginHash = crypto.scryptSync(
            password, student.salt, 64
        );

        const storedHash = Buffer.from(student.passwordHash, "hex");

        if (
            storedHash.length !== loginHash.length ||
            !crypto.timingSafeEqual(loginHash, storedHash)
        ) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        res.json({
            message: "Login successful!",
            student: {
                id: student.id,
                name: student.name,
                email: student.email,
                branch: student.branch,
                year: student.year
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login server error." });
    }
});

// Companies API
app.get("/api/companies", (req, res) => {
    try {
        res.json(readData(companiesFile));
    } catch (error) {
        console.error("Companies error:", error);
        res.status(500).json({ message: "Unable to load companies." });
    }
});

// Apply API
app.post("/api/apply", (req, res) => {
    try {
        const { studentId, companyId } = req.body;

        const students = readData(studentsFile);
        const companies = readData(companiesFile);
        const applications = readData(applicationsFile);

        const student = students.find(s => s.id === studentId);
        const company = companies.find(c => c.id === Number(companyId));

        if (!student || !company) {
            return res.status(404).json({
                message: "Student or company not found."
            });
        }

        if (applications.some(a =>
            a.studentId === studentId &&
            a.companyId === Number(companyId)
        )) {
            return res.status(409).json({
                message: "You have already applied."
            });
        }

        applications.push({
            id: crypto.randomUUID(),
            studentId,
            studentName: student.name,
            studentEmail: student.email,
            companyId: company.id,
            companyName: company.name,
            role: company.role,
            appliedAt: new Date().toISOString(),
            status: "Applied"
        });

        saveData(applicationsFile, applications);

        res.status(201).json({
            message: "Application submitted successfully!"
        });

    } catch (error) {
        console.error("Apply error:", error);
        res.status(500).json({ message: "Application failed." });
    }
});

// Student applications API
app.get("/api/applications/:studentId", (req, res) => {
    try {
        const applications = readData(applicationsFile);

        res.json(applications.filter(
            a => a.studentId === req.params.studentId
        ));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to load applications." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
