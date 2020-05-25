#!/usr/bin/env bash

npm install --only-prod

git fetch
git merge origin/master

pm2 stop server.js
pm2 start server.js --watch