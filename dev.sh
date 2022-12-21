#!/usr/bin/env bash

sudo docker image rm kloster-backend:latest --force
sudo docker image rm kloster-nginx:latest --force
sudo docker compose -f docker-compose-dev.yml up -d
