#!/usr/bin/env bash

git fetch
git checkout old
git merge origin/old

sudo docker image rm kloster-backend:latest --force
sudo docker image rm kloster-nginx:latest --force
sudo docker compose -f docker-compose-dev.yml up
