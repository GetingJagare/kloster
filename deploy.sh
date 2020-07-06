#!/usr/bin/env bash

git fetch
git merge origin/master

npm install --only-prod

pm2 stop server.js
pm2 start server.js --watch
