
// -----------------------------
// STUDENT REGISTRATION
// -----------------------------

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = document.getElementById("message");

        const student = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
            branch: document.getElementById("branch").value.trim(),
            year: document.getElementById("year").value
        };

        message.textContent = "Registering...";
        message.style.color = "blue";

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            });

            const result = await response.json();

            message.textContent = result.message;
            message.style.color = response.ok ? "green" : "red";

            if (response.ok) {
                registerForm.reset();
            }

        } catch {
            message.textContent = "Server connection failed.";
            message.style.color = "red";
        }
    });
}


// -----------------------------
// STUDENT LOGIN
// -----------------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = document.getElementById("loginMessage");

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        message.textContent = "Checking login...";

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                sessionStorage.setItem(
                    "loggedInStudent",
                    JSON.stringify(result.student)
                );

                window.location.href = "/dashboard.html";
            } else {
                message.textContent = result.message;
                message.style.color = "red";
            }

        } catch {
            message.textContent = "Server connection failed.";
            message.style.color = "red";
        }
    });
}


// -----------------------------
// DASHBOARD
// -----------------------------

let allCompanies = [];

if (window.location.pathname === "/dashboard.html") {

    const studentData = sessionStorage.getItem("loggedInStudent");

    if (!studentData) {
        window.location.href = "/login.html";
    } else {
        const student = JSON.parse(studentData);

        document.getElementById("studentName").textContent =
            student.name;

        document.getElementById("studentInfo").textContent =
            student.email + " | " +
            student.branch + " | " +
            student.year;

        loadCompanies();
        loadApplications();

        document.getElementById("searchCompany")
            .addEventListener("input", filterCompanies);

        document.getElementById("locationFilter")
            .addEventListener("change", filterCompanies);
    }
}


// -----------------------------
// LOAD COMPANIES
// -----------------------------

async function loadCompanies() {
    const companyList = document.getElementById("companyList");

    try {
        const response = await fetch("/api/companies");

        if (!response.ok) {
            throw new Error("Companies could not load");
        }

        allCompanies = await response.json();

        document.getElementById("companyCount").textContent =
            allCompanies.length;

        displayCompanies(allCompanies);

    } catch {
        companyList.textContent = "Unable to load companies.";
    }
}


// -----------------------------
// DISPLAY COMPANY CARDS
// -----------------------------

function displayCompanies(companies) {
    const companyList = document.getElementById("companyList");

    companyList.innerHTML = "";

    if (companies.length === 0) {
        companyList.textContent = "No matching companies found.";
        return;
    }

    companies.forEach(company => {

        const card = document.createElement("div");
        card.className = "company-card";

        const name = document.createElement("h3");
        name.textContent = company.name;

        const role = document.createElement("p");
        role.className = "job-role";
        role.textContent = company.role;

        const location = document.createElement("p");
        location.textContent = "Location: " + company.location;

        const packageInfo = document.createElement("p");
        packageInfo.textContent = "Package: " + company.package;

        const deadline = document.createElement("p");
        deadline.textContent = "Last Date: " + company.deadline;

        const detailsButton = document.createElement("button");
        detailsButton.className = "btn";
        detailsButton.textContent = "View Details";

        const applyButton = document.createElement("button");
        applyButton.className = "btn";
        applyButton.textContent = "Apply Now";

        const details = document.createElement("div");
        details.className = "company-details";
        details.hidden = true;

        const eligibility = document.createElement("p");
        eligibility.textContent =
            "Eligibility: " + company.eligibility;

        const skills = document.createElement("p");
        skills.textContent =
            "Required Skills: " + company.skills;

        const descriptionHeading = document.createElement("h4");
        descriptionHeading.textContent = "Job Description";

        const description = document.createElement("p");
        description.textContent = company.description;

        const roundsHeading = document.createElement("h4");
        roundsHeading.textContent = "Selection Process";

        const roundList = document.createElement("ol");
        roundList.className = "round-list";

        (company.rounds || []).forEach(round => {
            const item = document.createElement("li");
            item.textContent = round;
            roundList.appendChild(item);
        });

        details.appendChild(eligibility);
        details.appendChild(skills);
        details.appendChild(descriptionHeading);
        details.appendChild(description);
        details.appendChild(roundsHeading);
        details.appendChild(roundList);

        detailsButton.addEventListener("click", () => {
            details.hidden = !details.hidden;

            detailsButton.textContent =
                details.hidden ? "View Details" : "Hide Details";
        });

        applyButton.addEventListener("click", () => {
            applyForJob(company.id, applyButton);
        });

        card.appendChild(name);
        card.appendChild(role);
        card.appendChild(location);
        card.appendChild(packageInfo);
        card.appendChild(deadline);
        card.appendChild(detailsButton);
        card.appendChild(applyButton);
        card.appendChild(details);

        companyList.appendChild(card);
    });
}


// -----------------------------
// SEARCH AND LOCATION FILTER
// -----------------------------

function filterCompanies() {
    const searchText = document
        .getElementById("searchCompany")
        .value.toLowerCase()
        .trim();

    const selectedLocation = document
        .getElementById("locationFilter")
        .value;

    const filteredCompanies = allCompanies.filter(company => {

        const matchesSearch =
            company.name.toLowerCase().includes(searchText) ||
            company.role.toLowerCase().includes(searchText);

        const matchesLocation =
            selectedLocation === "" ||
            company.location === selectedLocation;

        return matchesSearch && matchesLocation;
    });

    displayCompanies(filteredCompanies);
}


// -----------------------------
// APPLY FOR JOB
// -----------------------------

async function applyForJob(companyId, button) {
    const studentData = sessionStorage.getItem("loggedInStudent");

    if (!studentData) {
        window.location.href = "/login.html";
        return;
    }

    const student = JSON.parse(studentData);

    button.disabled = true;
    button.textContent = "Applying...";

    try {
        const response = await fetch("/api/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                studentId: student.id,
                companyId: companyId
            })
        });

        const result = await response.json();

        alert(result.message);

        if (response.ok) {
            loadApplications();
        }

    } catch {
        alert("Unable to submit application.");
    } finally {
        button.disabled = false;
        button.textContent = "Apply Now";
    }
}


// -----------------------------
// MY APPLICATIONS
// -----------------------------

async function loadApplications() {
    const studentData = sessionStorage.getItem("loggedInStudent");

    if (!studentData) return;

    const student = JSON.parse(studentData);
    const applicationList = document.getElementById("applicationList");

    try {
        const response = await fetch(
            "/api/applications/" + encodeURIComponent(student.id)
        );

        const applications = await response.json();

        applicationList.innerHTML = "";

        document.getElementById("applicationCount").textContent =
            applications.length;

        if (applications.length === 0) {
            applicationList.textContent =
                "You have not applied to any company yet.";
            return;
        }

        applications.forEach(application => {

            const item = document.createElement("div");
            item.className = "application-item";

            const heading = document.createElement("h3");
            heading.textContent = application.companyName;

            const role = document.createElement("p");
            role.textContent = "Job Role: " + application.role;

            const status = document.createElement("span");
            status.className = "status-label";
            status.textContent = application.status;

            item.appendChild(heading);
            item.appendChild(role);
            item.appendChild(status);

            applicationList.appendChild(item);
        });

    } catch {
        applicationList.textContent =
            "Unable to load applications.";
    }
}


// -----------------------------
// LOGOUT
// -----------------------------

function logout() {
    sessionStorage.removeItem("loggedInStudent");
    window.location.href = "/login.html";
}

window.logout = logout;
