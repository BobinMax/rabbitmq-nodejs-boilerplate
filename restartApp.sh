#!/bin/bash
docker rm -f app
docker run --name app --network test -p 80:8080 -v /var/www/test:/var/www/app -w /var/www/app -d app/node-web-app
