#!/usr/bin/env bash

git fetch
git checkout old
git merge origin/old

npm install --only-prod

pm2 stop server.js
pm2 start server.js --watch
