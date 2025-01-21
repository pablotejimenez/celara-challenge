# Official Node.js runtime as parent image
FROM node:20-bookworm

# Set working directory
WORKDIR /challenge_celara

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install the necessary branded browsers (Chrome and Edge)
RUN npx playwright install chrome msedge

# Copy the rest of the application files
COPY . .

# Install Playwright dependencies
RUN npx playwright install --with-deps

# Ensure proper permissions for all files
RUN chmod -R 755 /challenge_celara

# Command to run the tests
CMD ["npx", "playwright", "test"]
