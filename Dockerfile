FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/index.html
RUN rm -rf /usr/share/nginx/html/50x.html

COPY source/ /usr/share/nginx/html
COPY server/nginx.conf /etc/nginx/nginx.conf
COPY server/studio-otus.conf /etc/nginx/conf.d/default.conf


