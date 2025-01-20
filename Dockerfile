# Use an official Node.js runtime as a parent image
FROM node:20-bookworm

# Set working directory
WORKDIR /challenge_celara

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install the necessary browsers (Chromium and Edge)
RUN npx playwright install chrome msedge

# Copy the rest of the application files
COPY . .

# Install Playwright dependencies
RUN npx playwright install --with-deps

# Define the command to run your tests
CMD ["npx", "playwright", "test"]
