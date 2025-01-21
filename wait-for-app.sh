#!/bin/bash
URL=$1
MAX_RETRIES=30
SLEEP_INTERVAL=5

echo "Waiting for Demo app to be available at $URL..."
for ((i=1; i<=MAX_RETRIES; i++)); do
    STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    if [ "$STATUS_CODE" -eq 200 ]; then
        echo "Demo app is ready (received HTTP code 200)."
        exit 0
    fi
    echo "Try $i/$MAX_RETRIES: Demo app is not ready. Waiting $SLEEP_INTERVAL seconds..."
    sleep $SLEEP_INTERVAL
done

echo "Error: Demo app was not ready after $((MAX_RETRIES * SLEEP_INTERVAL)) seconds."
exit 1