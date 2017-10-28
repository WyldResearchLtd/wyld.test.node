# Latest version of Node LTS from Docker Hub
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Binds to port and maps via the docker daemon
EXPOSE 8080

# Environment Variables
# ENV MONGO_CONN "mongodb://<username>:<password>@<URI or commma sep cluster list>:<port 27017>/<Database>?ssl=true&replicaSet=<replicaSet name>&authSource=admin"
ENV MONGO_CONN "mongodb://Admin:JpPLb108@cluster0-shard-00-00-bidul.mongodb.net:27017,cluster0-shard-00-01-bidul.mongodb.net:27017,cluster0-shard-00-02-bidul.mongodb.net:27017/<Database>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"

# and go
CMD [ "npm", "start" ]
