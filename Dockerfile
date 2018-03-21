FROM node:carbon

# Create app directory
WORKDIR /var/www/app

CMD [ "npm", "install", "--no-bin-links" ]
CMD [ "npm", "start" ]