# **Celara Automation Challenge**

## Must have before start

- Git
- Docker
- Node.js

## Clone the Celara Challenge GitHub Repo

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

#### In the installation wizard, choose JavaScript

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
   _(Note: for simplicity, the .env file is commented out in `.gitignore` file)_

## Run tests manually

### Run all the tests locally

```bash
npx playwright test
```

### Run a specific tests suite

Example:

```bash
npx playwright test specs/login.spec.js
```

### See report after a test run

```bash
npx playwright show-report
```

## Run test with Docker image

### Set up and run the application:

```bash
docker pull automaticbytes/demo-app
```

```bash
docker run -p 3100:3100 automaticbytes/demo-app
```

### Set up the testing environment and run the tests:

```bash
docker-compose build tests
```

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

### Tear down Docker:

```bash
docker-compose down
```

#### If you encounter orphan containers, remove them:

```bash
docker-compose down --remove-orphans
```
