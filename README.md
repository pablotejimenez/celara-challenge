# **Celara Automation Challenge**

This project uses Playwright with JavaScript, and has 3 ways to run the tests:

1. Locally
2. Inside a Docker container
3. With a CI/CD flow in Github Actions

## Contents
- [Must Have Before Start](#must-have-before-start)
- [Clone the repo](#clone-this-celara-challenge-github-repo)
- [Install Playwright](#install-playwright)
- [Run the Tests Locally](#run-the-tests-locally)
  - [Set Up and Run the Demo Application](#set-up-and-run-the-demo-application)
  - [Run All the Tests Locally](#run-all-the-tests-locally-headless)
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
  - [Uploads Test Report](#uploads-test-report)
- [About the Project](#about-the-project)

## Must have before start

- Git
- Docker
- Node.js

## Clone this Celara Challenge GitHub Repo

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

### Run all the tests locally (headless)

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
- The action run can be re-run manually if needed.

## About the project

My goal was to make it clean, concise, scalable, efficient and automated. Here are the main keys:

### Implemented a Page Object Model

I kept things organized by separating page specific actions and elements into their own classes.

### It's Dockerized :)

Provided some handy instructions to build (and run the tests inside) a Docker image, containing the Demo app and the test code.

### It has its own CI/CD Workflow in GitHub Actions

It has a fully automated workflow that:

- Builds the app and test suite using Docker.
- Runs the tests and generates a Playwright report.
- Uploads the report to GitHub Actions artifacts.
- Cleans up containers when it’s done.

### Added a wait-for-app Script:

For the CI/CD flow, I added a little script that makes sure the Demo app is ready to go before tests start running, to prevent connection refused errors.

### It has a Configuration File:

Keeps credentials and other important strings in one place, making it easy to update and manage.

### Handle the sensitive data:

Implemented an .env file to handle sensitive data in the Playwright configuration file, and the test data configuration file.

_Note: while the `.env` file is actually included in the project, it is a proof of concept in order to show how I would handle the secrets. A nice approach would be to inject the secrets from Github Actions secrets, or even better AWS Secrets Manager, into the Docker container env before running the tests._

### It has some helpers:

The repetitive tasks are handled in a helper file that has commonly used methods.

### And it supports many, many Browsers:

It works with all the popular and branded browsers: Chrome (and Chromium), Firefox, Firefox, Safari (WebKit) and Edge.
It also supports mobile viewports, so the coverage extends to iPhones and androids.
