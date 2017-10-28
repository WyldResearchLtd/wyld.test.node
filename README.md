# STUB-Node-REST-Mongo MICROSERVICE

## Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a563236b09e66c00de2e)

### Postman Environments  
[Synergy-Demo](./**private/Synergy-Demo.postman_environment.json)  
[Synergy-Stage](./**private/Synergy-Stage.postman_environment.json)  
[Synergy-Local](./**private/Synergy-Local.postman_environment.json)  

### Endpoints
https://synergy-work-ebolt.herokuapp.com  DEMO  
https://synergy-sandbox-ebolt.herokuapp.com  DEV  

## SRC Environments

### REPOs
demo	https://git.heroku.com/synergy-work-ebolt.git (fetch)  
demo	https://git.heroku.com/synergy-work-ebolt.git (push)  
origin	ssh://git@bitbucket.org/electricgemini/synergy-work-ebolt.git (fetch)  
origin	ssh://git@bitbucket.org/electricgemini/synergy-work-ebolt.git (push)  
dev	https://git.heroku.com/synergy-sandbox-ebolt.git (fetch)  
dev	https://git.heroku.com/synergy-sandbox-ebolt.git (push)  

### Stack
> Node.js  
> Express  
> Mongoose/MongoDB  
> Casper.js/Phantom.js  

### Source Layout  

```
  /  
  |-bin/  - this is where the app's main entry point is- sets up the server
  |-app.js  - this sets up the main routing
  |-models/  - the schema's for Mongo
  |-routes/  - these are the routes that are called by app.js
  |-views/ - templates for the UI. Not used much for web services
  |-public/ - assets (images, css,js) for web pages
```


## Deployment

This project stub allows you to easily deploy Node/Express with Mongo web services quickly and easily using 4 diff methods:

### Git
It's SCM, not a deployment method, but with its many hooks that trigger deployments (TravisCI, Bitbucket Pipelines, etc)
````
git add -A .
git commit -am "msg"
git push -u origin master
````

### Heroku
A Free Tier that's really free. The preferred prototype platform.
Actually sits on top of its own git repo, but since I use to prototype, I use both in combinations.

Deploying to Heroku is fast, easy, and no cost to test (as opposed to Amazon, where even in the free tier you can run up bandwidth costs). All you need to be
sure of is that package.json has "scripts": {"start": "node server.js"} and
you have a Procfile with the line 'worker:  npm start'  

Be sure you use ```process.env.PORT || XXXXX``` to define the Port, where XXXX is the port you use for testing.
Heroku used the environmental variable PORT to assign a port which is maps to port 80. You can only export port 80
externally on Heroku.

To update your deployed Heroku app, you simply:  
````bash
# To see which account is current
# assumes you've installed plugin with $ heroku plugins:install heroku-accounts
$ heroku accounts:current

# list accounts
$ heroku accounts

# switch accounts
$ heroku accounts:set <account>

#more about accounts: https://github.com/heroku/heroku-accounts

# to create a Heroku app. <my-app-name> is optional.
# without it Heroku will assign a random name
$ heroku create <my-app-name>

#sets environ vars
$ heroku config:set <VARNAME>=<value>

# set the git remote for Heroku to your Herko git repo.
$ git push -u heroku master
````

### AWS (Elastic beanstalk)
A fast, inexpensive, easy way to build a scalable solution. This is the basic implementation for a  production cloud deployment. Elastic Beanstalk is a quick deployment model built on AWS services, that is built to scale, albeit moving away from EB to an AWS stack built on their individual components (EC2 Containers, Elastic Load Balancer, etc) with more granular control.

````bash
zip app.js package.json
# use AWS CLI to manage upload, start, and logs of Elastic Beanstalk
````

### Docker
Our cross platform build and local test solution that scales to production. Great for local testing, a lightweight alternative to using WMware locally, and scriptable.

````bash
# Diplays repo images w/ Image id
$ docker images

# Displays running processes w/ Container ID
$ docker ps

# Builds local directory to docker image
$ docker build -t <user name>/<app name> .

# Run the image, creating a container instance
#[-p] maps the external port to the internal port
#[-d] runs it in detached mode-in background
$ docker run -p 49160:8080 -d <user name>/<app name>

# Shell into the container
$ docker exec -it <container id> /bin/bash

#remove untagged images
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
````

You can pass environment variables to your containers with the -e flag.

An example from a startup script:
````bash
#removed these two parameters to see what they do
#[-t] Allocate a pseudo-tty
#[-i] Keep STDIN open even if not attached
sudo docker run -d -t -i  \
-e MONGO_CONN="mongodb://<username>:<password>@<URI/Comma Seperated Cluster List>:
<post 27017>/<Database>?ssl=true&replicaSet=<ReplicaSet Name>&authSource=admin" \
-p <Docker Port>:<Node Port> \
--name <Name>
<user_name/<image_name>
````
Alternatively you can add the environ var to the Dockerfile and when you build the Container the env var will persist. Uncomment the example in the Dockerfile and fill in the Values.

### Starting from the commandline
You can put the environmental variable on the line when calling node:
````
ENVIRON_VAR='value' node server.js
````
#### Using Nodemon
With nodemon you no longer need to restart node every time your change files locally. Nodemon wraps node on the commandline.

Using nodemon:
````bash
# Install nodemon globally
$ npm install nodemon -g

# you can pass all the arguments you would normally pass to your app
nodemon [your node app]
````


## Setup Mongo

+ Setup the a Database on mongodb.com. I didn't use mLab, because they require a CC number even for the free tier. (Note- need precise details for MongoDB Atlas).
    + Sign up for a free account
    + Create a new database (select free tier)
    + click on newly created DB Add a user
    + set the access whitelist (0.0.0.0/0 for all access)
    + Get the Database URI (connection string given at top)  


+ Add the environmental variable for the DB Connection string. Note that you must use quotes around the string, or else the string gets truncated at the first '&'.
````
heroku config:set MONGO_CONN="mongodb://Admin:<password>@  
cluster0-shard-00-00-bidul.mongodb.net:27017,  
cluster0-shard-00-01-bidul.mongodb.net:27017,  
cluster0-shard-00-02-bidul.mongodb.net:27017/<Database>?  
ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
````
 **NOTE- DO NOT CUT AND PASTE THE CODE BLOCK ABOVE.**   
 You must first replace <password> and <database> and recreate this string on a single line without line breaks.  

 Also note that if you wish to use Robomongo to inspect the database, you need version 1.1 Beta. (Note- add precise steps for configuring Robomongo)  

## Testing the Sample API

| Resource  (URI)  | POST       | GET        | PUT        | DELETE      |
|------------------|------------|------------|------------|-------------|
| /v1/synergy/     | Create     | Read (All) | N/A        | N/A         |
| /v1/synergy/:id/ | N/A        | Read :id   | Update :id | Destroy :id |

#### CREATE  
curl -XPOST https://synergy-poc.herokuapp.com/v1/synergy -d 'name=Master%20Routes&completed=false&note=soon...'  

#### READ  
curl https://synergy-poc.herokuapp.com/v1/synergy/  
curl -XGET https://synergy-poc.herokuapp.com/v1/synergy/{id}}/  

#### UPDATE  
curl -XPUT https://synergy-poc.herokuapp.com/v1/synergy/{id}}/ -d "note=hola"  

#### DESTROY  
curl -X "DELETE" https://synergy-poc.herokuapp.com/v1/synergy/{id}/  
0
