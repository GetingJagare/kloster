#!/usr/bin/env bash

git fetch
git checkout -b old
git merge origin/old

npm install --only-prod

pm2 stop server.js
pm2 start server.js --watch
