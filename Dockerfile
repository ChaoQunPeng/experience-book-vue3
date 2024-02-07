# Start your image with a node base image
FROM nginx:latest

COPY ./dist/ /usr/share/nginx/html/

COPY ./nginx/default.conf /etc/nginx/nginx.conf