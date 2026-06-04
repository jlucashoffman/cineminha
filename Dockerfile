# Etapa 1: Instala o Node, baixa os pacotes e gera a pasta "build"
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG PUBLIC_SERVER_PROTOCOL
ARG PUBLIC_SERVER_IP

ENV PUBLIC_SERVER_PROTOCOL=$PUBLIC_SERVER_PROTOCOL
ENV PUBLIC_SERVER_IP=$PUBLIC_SERVER_IP

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80