# QT-API-TESTS

## Description
This project is using Jest for API testing. The tests are designed to validate CRUD operations, error handling, and other edge cases for the Users API. The project is configured to run both locally and in a Dockerized environment.

## Prerequisites
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/)

## Installation
### Cloning the Repository
1. Clone this repository to your local machine:
    ```
    https://github.com/rohithravi08/QT-API-TESTS.git
    ```

2. Navigate to the root folder and execute:
    ```
    npm ci
    ```

## Running Tests
To execute the tests, pass the following environment variables:

- `NODE_ENV`: Set to `production` or `test` to execute the tests against the desired environment. Currently it will work only against production environment as there is no test environment for the url
- `TOKEN`: Pass your API token as a string.

### Running Tests Locally
```
npx cross-env TOKEN="xxxx" NODE_ENV="production" npm test    
```
### Running Tests using Docker
```
npx cross-env TOKEN="xxxx" NODE_ENV="production" docker-compose up --build
```

## Test Reporting
After running the tests, the project generates the following reports to provide insights into the test results and code coverage:

- `JUnit XML Report`
Location: test-reports/jest-test-report.xml
Provides detailed test results (pass/fail), errors, and execution time.
- `HTML Test Report`
Location: test-reports/test-report.html
A visual summary of test results, including passed/failed tests, failure messages, and execution times.
- `Code Coverage Report`
Location: coverage/lcov-report/index.html
Provides a detailed breakdown of test coverage, highlighting which parts of the code are tested and which are not.


## Directory Structure
```
QT-API-TESTS/
├── config                  # Configuration files (base URL, API paths, environment settings)
│   └── index.js            # To fetch the NODE_ENV from the CLI
├── data                    # Sample data files (e.g., requestBody.json)
│   └── requestBody.json    # Example JSON file for test requests
├── utils                   # Utility functions for testing
│   ├── testUtils.js        # Common test utilities (e.g., API request functions)
├── tests                   # Test files directory
│   ├── Users               # Test files for API tests
│   │   └── users.test.js   # Example test file for API tests
├── coverage                # Test coverage reports(This folder is generated after execution)
│   └── lcov-report/        # Detailed coverage report in HTML format
├── test-reports            # Directory for test reports (JUnit, HTML)(This folder is generated after execution)
│   ├── jest-test-report.xml  # JUnit test report
│   └── test-report.html    # HTML test report
├── Dockerfile              # Docker configuration file for building the container
├── docker-compose.yml      # Docker compose file to set up the services
├── jest.config.js          # Jest configuration file for running tests
├── package.json            # Project metadata and dependencies
├── .dockerignore           # Specifies files to ignore when building the Docker image
├── .gitignore              # Specifies files and directories to be ignored by Git
└── README.md               # Project documentation
```

