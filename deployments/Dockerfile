FROM nginx:stable-alpine3.17-slim

COPY build /usr/share/nginx/html

COPY ./deployments/nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]