#!/bin/bash
docker rm -f rabbitmq
docker run -d --network test -p 15672:15672 --name rabbitmq rabbitmq:3
sleep 10
docker exec -it rabbitmq rabbitmq-plugins enable rabbitmq_management
docker exec -it rabbitmq rabbitmq-plugins enable rabbitmq_tracing
