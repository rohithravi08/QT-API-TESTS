module.exports = {
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['js', 'json'],
    testMatch: ['**/tests/**/*.test.js'],
    reporters: [
      "default",
      // JUnit Reporter
      ["jest-junit", {
        outputDirectory: "./test-reports",
        outputName: "jest-test-report.xml"
      }],
      // HTML Reporter
      ["jest-html-reporter", {
        pageTitle: "Jest Test Report",
        outputPath: "./test-reports/test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      }]
    ]
  };
  