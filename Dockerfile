# Use Node.js LTS base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY index.js ./
#COPY .env ./

# Install dependencies
RUN npm install

# Start app
CMD ["node", "index.js"]
