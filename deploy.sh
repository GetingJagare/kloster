#!/usr/bin/env bash

git fetch
git checkout master
git merge origin/master

sudo docker compose down
sudo docker image rm kloster-backend:latest --force
sudo docker compose up -d
