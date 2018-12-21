#!/bin/bash

# Make sure our scripts are readable
chmod -R 777 ./keycloak

# Stop the existing docker containers we made with Compose
docker-compose stop

# Rebuild the containers and detatch from this terminal
docker-compose build
docker-compose up -d
