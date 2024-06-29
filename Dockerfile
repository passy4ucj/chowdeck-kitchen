# Use the official Node.js image as the base image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your application runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
