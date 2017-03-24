# Microservice of comments about movies in a cinema 



![alt text](https://www.dropbox.com/s/p8bzdssqik2tw9m/microservice-cinema-architecture.png?dl=1 "microservices architecture")

### Install node dependencies 
```
$ npm install
```
### How to start or continue development ?

```
$ npm start
```
### How to build for production ?

```
$ docker build -t darcusfenix/micro-cinema-comments:v1.0.0 .
```
### How to run in production ?

```
$ docker run -it --name micro-cinema-comments \
-p 3000:3000 -d \
darcusfenix/micro-cinema-comments:v1.0.0
```
### How to create a service in docker swarm ?

```
$ docker service create \
--replicas 5 \
--name micro-cinema-comments \
--update-delay 10s \
--publish 3001:3000 \
--env-file env \
darcusfenix/micro-cinema-comments:v1.0.0
```
### How to update a service with new image in docker swarm and Zero downtime ?

```
$ docker service update \
--image darcusfenix/micro-cinema-comments:v1.0.1 \
micro-cinema-comments
```
### How to follow logs of a container ?

```
$ docker logs --follow 5cae460ac10e
```
