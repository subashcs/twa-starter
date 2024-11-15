#!/bin/bash

# Define variables
# TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
DEPLOYMENT_URL="your-deployment.vercel.app"

# Construct the webhook URL
WEBHOOK_URL="https://twa-starter-black.vercel.app"

# Execute the curl command
curl "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}"
