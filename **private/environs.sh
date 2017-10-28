#!/bin/bash
echo Setting Transient Enviromental Variables
export MONGO_CONN="mongodb://Admin:JpPLb108@ \
cluster0-shard-00-00-bidul.mongodb.net:27017, \
cluster0-shard-00-01-bidul.mongodb.net:27017, \
cluster0-shard-00-02-bidul.mongodb.net:27017/synergy \
ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
echo MONGO_CONN: $MONGO_CONN
