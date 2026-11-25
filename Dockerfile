FROM nginx:alpine
LABEL org.opencontainers.image.source="https://github.com/HelenaMoreto/trabalho-devOps"
COPY index.html style.css /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
EXPOSE 80
