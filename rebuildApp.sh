#!/bin/bash
docker rm -f app
docker image rm app/node-web-app
docker build -t app/node-web-app .
docker network create test
