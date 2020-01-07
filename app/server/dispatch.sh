#!/bin/bash

curl -X POST -s \
  --form-string "app_key=$APP_KEY" \
  --form-string "app_secret=$APP_SECRET" \
  --form-string "target_type=app" \
  --form-string "content=$1" \
  https://api.pushed.co/1/push