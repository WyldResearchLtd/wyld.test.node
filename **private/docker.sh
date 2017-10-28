#!/bin/bash

#force removes all existing containers
#docker rm -f `docker ps --no-trunc -aq`

docker build -t genemyers/stub-node-rest-mongo .

docker run -d -t -i
-e MONGO_CONN="mongodb://Admin:JpPLb108@cluster0-shard-00-00-bidul.mongodb.net:27017,cluster0-shard-00-01-bidul.mongodb.net:27017,cluster0-shard-00-02-bidul.mongodb.net:27017/synergy?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin" \
-p 49165:8080 --name STUB-Node-REST-Mongo \
genemyers/stub-node-rest-mongo

docker ps
