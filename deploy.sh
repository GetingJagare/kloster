#!/usr/bin/env bash

git fetch
git checkout old
git merge origin/old

sudo docker compose down
sudo docker image rm kloster-backend:latest --force
sudo docker compose up -d
