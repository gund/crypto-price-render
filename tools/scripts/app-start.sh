#!/bin/sh

cd apps/crypto-price-render/container
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
