# Use the official Node.js image as the base image
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the rest of the app's source code
COPY . .

# Install dependencies
RUN npm install

# Build the Angular app
RUN npm run build


# Use a lightweight server image to serve the app
FROM nginx:latest

# Copy the built app from the previous stage to the server's web root
COPY --from=builder /app/dist/heroes-app /usr/share/nginx/html

# Expose port 80 to access the app from the outside
EXPOSE 80

# Start the Nginx server when the container runs
CMD ["nginx", "-g", "daemon off;"]