# api-logging-experiments

This project is intended to function as a proof of concept around adding Kafka-based logging to an arbitrary API built with typescript and docker for infrastructure-as-code.

## Project Containers

The project currently is designed as a multi-container solution using the following:

    - zookeper: required by kafka in order to keep things running. It's like a federation layer
    - kafka: a widely used distributed and scalable event logging system interact directly with this server using `http://localhost:9082`
    - kafka-ui: this is so cool! It's a super easy way to see what's happening within your kafa instance when the cluster is running you can browse the ui on `http://localhost:8082` great for debugging.
    - my-exeprimental-api: this is the code found within the `./api/` folder.  When running this will get deployed on `http://localhost:8083` note that before running the docker-compose, you must BUILD the docker image using the command `docker build ./api --tag my-experimental-api`

## Project Dependencies

- docker

## Running the project

1. ensure docker exists on your system (or install it)
1. check out the repo
1. build the API container by running the the command from the root: `docker build ./api --tag my-experimental-api` 
1. run the cluster using the command: `docker compose up -d`

## interacting with the API

the api has six endpoints currently all stubs intended to demonstrate the logging of API calls

to be clear - they do NOTHING but write events to kafka telling you that they were called.

- GET `/api/v1/invoice/` 
- GET `/api/v1/payment/` 
- GET `/api/v1/log/` 
- POST `/api/v1/invoice/` 
- POST `/api/v1/payment/` 
- POST `/api/v1/log/` 

## TODO: 

- ~~write middleware so endpoints can be configured to log to kafka~~
- implement a ksqldb connection
- write a GET function for the log API so it can read the list of logs
- expand the log-reader so that it is queryable along a number of dimensions. (TBD)



- do we have to figure out how to link up a dev specific salesforce instance to a local mongo database?
- for using a shared instance of kafka - how do individual developers use local database?
