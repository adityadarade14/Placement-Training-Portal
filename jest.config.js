
module.exports = {
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.js"],
    collectCoverageFrom: [
        "Backend/server.js",
        "!**/node_modules/**"
    ],
    coverageDirectory: "coverage"
};
