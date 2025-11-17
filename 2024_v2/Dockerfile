FROM httpd:alpine

COPY index.html /usr/local/apache2/htdocs/
COPY game.js /usr/local/apache2/htdocs/
COPY style.css /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd-foreground"]