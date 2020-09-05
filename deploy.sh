#!/usr/bin/env sh

docker-compose down --remove-orphans
docker-compose up -d --build
docker system prune -a -f
