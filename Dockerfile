# COMPILE APP
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install
RUN npm run build

# NGINX PHASE
FROM nginx:latest
COPY --from=builder /app/dist/heroes-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]