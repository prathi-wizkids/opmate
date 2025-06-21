# Use Node.js LTS base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./
#COPY index.js ./
#COPY .env ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Build TypeScript
RUN npx tsc

# Expose default Cloud Run port
EXPOSE 8080

# Start app
CMD ["node", "dist/index.js"]
