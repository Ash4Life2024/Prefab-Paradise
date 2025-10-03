#!/bin/bash
set -e
echo "Applying full-app.patch..."
git apply full-app.patch
git add .
git commit -m "TurboTonic: Add Pinecone, Stripe, Grants.gov scrapers, Firebase rules, CI/CD updates"
git push origin main
