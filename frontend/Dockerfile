#build
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

#runtime
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build/ .

EXPOSE 80