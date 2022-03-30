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

(in browser) http://localhost

docker-compose up -d --scale whoami=4

(in browser) http://localhost

// watch the hostname & IP of each container change! We are load balancing!
```

## Cleaning up

```
docker kill $(docker ps -aq)

docker rm $(docker ps -aq)
```