#!/usr/bin/env bash

npm install --only-prod

git fetch
git merge origin/master