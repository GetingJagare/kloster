#!/usr/bin/env bash

git fetch
git merge origin/master

npm install --only-prod