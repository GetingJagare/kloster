#!/usr/bin/env bash

git fetch
git checkout old
git merge origin/old

sudo docker compose down
sudo docker image rm kloster-backend:latest --force
sudo docker image rm kloster-nginx:latest --force
sudo docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d vsv-kloster.ru -d www.vsv-kloster.ru
sudo docker compose up -d
