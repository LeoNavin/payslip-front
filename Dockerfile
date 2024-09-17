# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend ./

# Build the application
RUN npm run build

# Install Vercel CLI
RUN npm install -g vercel

# Set the default command to execute when the container starts
CMD ["vercel", "--token", "${VERCEL_TOKEN}", "--project", "${VERCEL_PROJECT_ID}", "--confirm", "--prod"]
