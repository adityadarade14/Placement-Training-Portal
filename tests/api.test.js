
const request = require("supertest");
const fs = require("fs");
const os = require("os");
const path = require("path");

// Use separate temporary data for tests
const testDataPath = fs.mkdtempSync(
    path.join(os.tmpdir(), "campusconnect-test-")
);

process.env.DATA_DIR = testDataPath;

const app = require("../Backend/server");

const studentsFile = path.join(testDataPath, "students.json");
const applicationsFile = path.join(testDataPath, "applications.json");

beforeEach(() => {
    fs.writeFileSync(studentsFile, JSON.stringify([]));
    fs.writeFileSync(applicationsFile, JSON.stringify([]));
});

describe("CampusConnect API Tests", () => {

    test("GET /api/status should return success", async () => {
        const response = await request(app).get("/api/status");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Backend is running successfully!"
        );
    });

    test("GET /api/companies should return company list", async () => {
        const response = await request(app).get("/api/companies");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("POST /api/register should register a student", async () => {
        const response = await request(app)
            .post("/api/register")
            .send({
                name: "Test Student",
                email: "test@example.com",
                password: "test123",
                branch: "IT",
                year: "Second Year"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe(
            "Registration successful! Please login."
        );
    });

    test("POST /api/login should login registered student", async () => {
        await request(app)
            .post("/api/register")
            .send({
                name: "Test Student",
                email: "test@example.com",
                password: "test123",
                branch: "IT",
                year: "Second Year"
            });

        const response = await request(app)
            .post("/api/login")
            .send({
                email: "test@example.com",
                password: "test123"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Login successful!");
        expect(response.body.student.email).toBe("test@example.com");
    });

    test("POST /api/register should reject duplicate email", async () => {
        const student = {
            name: "Test Student",
            email: "test@example.com",
            password: "test123",
            branch: "IT",
            year: "Second Year"
        };

        await request(app).post("/api/register").send(student);

        const response = await request(app)
            .post("/api/register")
            .send(student);

        expect(response.statusCode).toBe(409);
    });

    test("POST /api/apply should submit an application", async () => {
        await request(app)
            .post("/api/register")
            .send({
                name: "Test Student",
                email: "test@example.com",
                password: "test123",
                branch: "IT",
                year: "Second Year"
            });

        const students = JSON.parse(
            fs.readFileSync(studentsFile, "utf8")
        );

        const response = await request(app)
            .post("/api/apply")
            .send({
                studentId: students[0].id,
                companyId: 1
            });

        expect(response.statusCode).toBe(201);
    });
});
