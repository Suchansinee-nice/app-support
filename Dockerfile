# Stage 1: Build Angular app
FROM node:18.20.5 AS build

# Build argument to specify Angular configuration
ARG CONFIG=production

WORKDIR /app

# Install dependencies only from lock file
COPY package.json package-lock.json ./

# Uncomment this line if you want to skip dev dependencies
# RUN npm ci --omit=dev 

# Install production dependencies
RUN npm ci

# Copy source code
COPY . .


# Build the Angular app using provided configuration (e.g., dev/uat/prod)
RUN npm run build -- --configuration=$CONFIG

# Stage 2: Nginx for serving the app
FROM nginx:1.25-alpine

# Clean and optimized nginx config (optional: customize it)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Angular build output from previous stage
COPY --from=build /app/dist/osr-appsupport/browser/browser/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]