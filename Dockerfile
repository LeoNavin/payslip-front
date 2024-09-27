# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Start the application (optional, if you want to run it in the container)
CMD ["npm", "start"]
