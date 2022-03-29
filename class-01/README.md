# Class 01

## Running a simple container

```
docker run -it ubuntu

uname -a

exit
```

## Running a 'web' exposed container

```
docker run -d -p 9000:80 traefik/whoami

docker ps

(in browser) http://localhost:9000
```


## Load balancing a container

```
docker-compose up -d

(in browser) http://localhost:8080

curl -H Host:whoami.docker.localhost http://127.0.0.1

docker-compose up -d --scale whoami=4 
```

## Cleaning up

```
docker kill $(docker ps -aq)

docker rm $(docker ps -aq)
```