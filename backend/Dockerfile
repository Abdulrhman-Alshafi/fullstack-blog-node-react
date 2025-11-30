FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (to optimize caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["node", "app.js"]
