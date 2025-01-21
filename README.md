# **Celara Automation Challenge**

This project uses Playwright with JavaScript, and has 3 ways to run the tests:

1. Locally
2. Inside a Docker container
3. With a dockerized CI/CD flow in Github Actions

## Contents

- [About the Project](#about-the-project)
- [Must Have Before Start](#must-have-before-start)
- [Clone the repo](#clone-this-celara-challenge-github-repo)
- [Install Playwright](#install-playwright)
- [Run the Tests Locally](#run-the-tests-locally)
  - [Set Up and Run the Demo Application](#set-up-and-run-the-demo-application)
  - [Run All the Tests](#run-all-the-tests-headless)
  - [Run a Specific Test Suite](#run-a-specific-test-suite)
  - [See Report After a Test Run](#see-report-after-a-test-run)
- [Run the Tests with Docker](#run-the-tests-with-docker)
  - [Build the Docker Image](#build-the-docker-image)
  - [Initialize the Demo App and Run the Tests](#initialize-the-demo-app-and-run-the-tests)
  - [(Optional) Run Tests Manually Inside Docker](#optional-run-tests-manually-inside-docker)
  - [Teardown Docker Container](#teardown-docker-container)
- [Continuous Integration Workflow](#continuous-integration-workflow)
  - [Builds the App and Test Suite](#builds-the-app-and-test-suite)
  - [Runs the Tests](#runs-the-tests)
  - [Tears Down Containers](#tears-down-containers)
  - [Uploads the Test Report](#uploads-test-report)

## About the project

My goal was to make it clean, concise, scalable, efficient and automated.

The project is fully dockerized, and it supports being run locally but it's also used for the Github Actions runner. The docker-compose and Dockerfile are configured to be executed with a single command that triggers a new build, that will run the Demo app, wait for it to be ready, install all needed packages and run the test suites.

I've also implemented a CI/CD workflow on Github Actions, so it's easy to run the test suites everytime a pull request to the main branch is created, and everytime a merge to the same branch is executed. This aims to prevent the introduction of bugs in the system, so it can help ease the manual testing effort and so the dev team can merge to main with confidence. The test suites run is also triggerable directy from Github Actions to assure fast response when needed.

After the tests are done running, the report is copied and saved, and made available to be downloaded from the run detail. If I were to make an improvement of this flow, it would be to get the report published in a secure server with easy access for the stakeholders, the dev team and other non-tech employees.

In order to handle the friction between the time it takes for the Demo app build to be available at localhost and the time it takes the tests to start running, a script was implemented to check that the expected url returns 200 before running the tests. This was handled with a little bash script.

Then, I've set up an .env file to keep secrets separate. For this example, the .env file was actually provided in the repo, but in a real project I would inject the secrets from AWS Secrets Manager into the Docker container env before running the tests.

As to the test design, the test suites are implemented using a page object model design pattern, where every page is represented with a singular file. The specs are created with the same logic and a configuration file allows us to easy handle test data in the case we need to change it. Also a helpers page contains the methods that are useful and shared across the pages.

Finally, the test scripting was intended to be assertive, testing specifically what the test cases described, and using pages methods to improve readability by using descriptive naming with clean code best practices.

Well, to summarize:

### Implemented a Page Object Model

I kept things organized by separating page specific actions and elements into their own classes.

### It's Dockerized

Provided instructions to build (and run the tests inside) a Docker image, containing the Demo app and the test code.

### It has its own CI/CD Workflow in GitHub Actions

It has a fully automated workflow that:

- Builds the app and test suite using Docker.
- Runs the tests and generates a Playwright report.
- Uploads the report to GitHub Actions artifacts.
- Cleans up containers when it’s done.

### Added a wait-for-app Script

For the CI/CD flow, I added a little bash script that makes sure the Demo app is ready to go before tests start running, to prevent connection refused errors.

### It has a Configuration File

Keeps credentials and other important strings in one place, making it easy to update and manage.

### Handle the sensitive data

Implemented an .env file to handle sensitive data in the Playwright configuration file, and the test data configuration file.

_Note: while the `.env` file is actually included in the project, it is a proof of concept in order to show how I would handle the secrets._

### It has some helpers

The repetitive tasks are handled in a helper file that has commonly used methods.

### And it supports many Browsers

It works with all the popular and branded browsers: Chrome (and Chromium), Firefox, Safari (WebKit) and Edge.
It also supports mobile viewports, so the coverage extends to iOS and Android devices.

## Must have before start

- Git
- Docker
- Node.js

## Clone this GitHub Repo

1. **Navigate to the directory where you want to clone the repository**:

```bash
cd desired/directory
```

2. **Clone the repository**:

```bash
git clone git@github.com:pablotejimenez/celara-challenge.git
```

## Install Playwright

### Install NPM dependencies

```bash
npm install
```

### Install latest version of Playwright

```bash
npm init playwright@latest
```

#### _In the installation wizard, choose JavaScript_

### Install branded Browsers

```bash
npx playwright install chrome msedge
```

### Create .env file

1. **Copy the `.env.example` file and rename it as `.env`**

   ```bash
   cp .env.example .env
   ```

2. **Replace the placeholder values with the correct values for your environment**

   _Note: for simplicity, the `.env` file is commented out on purpose in `.gitignore` file._

   _In a real life scenario, the sensitive values would be injected into the .env file from a secure source, such as AWS Secrets Manager._

## Run the tests locally

### Set up and run the demo application:

```bash
docker pull automaticbytes/demo-app
```

```bash
docker run -p 3100:3100 automaticbytes/demo-app
```

### Run all the tests (headless)

```bash
npx playwright test
```

### Run a specific test suite

Example:

```bash
npx playwright test specs/login.spec.js
```

### See report after a test run

```bash
npx playwright show-report
```

## Run the tests with Docker

This project includes instructions to manually build a Docker image that pulls the Demo app and runs the test suite inside the container.

### Build the Docker image:

```bash
docker-compose build tests
```

### Initialize the demo app and run the tests:

```bash
docker-compose up
```

#### (Optional) Run tests manually inside Docker:

```bash
docker-compose exec tests bash
```

```bash
npx playwright test
```

### Teardown Docker container:

```bash
docker-compose down --remove-orphans
```

## Continuous Integration Workflow

This project includes a GitHub Actions workflow that builds a Docker image, pulls the Demo app, runs the test suite inside the container, uploads the report to Artifacts and tears down the image, listening on `push` and `pull request` actions.

### Builds the App and Test Suite:

- Uses Docker to containerize both the application and the test suite.
- Pulls the Demo app and waits until the app is available at localhost.

### Runs the Tests:

- Executes the test suite inside the container.
- Generates a Playwright report for the test results.

### Tears Down Containers:

- Automatically stops the Docker container after tests complete.

### Uploads Test Report:

- The generated Playwright report is uploaded to GitHub Actions as an artifact.
- You can download the report from the GitHub Actions run page under the Artifacts section.

#### The tests can be re-run manually from the run detail if needed.
