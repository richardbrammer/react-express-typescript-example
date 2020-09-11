# React Express Typescript Example
This is an example web app, showing an Express back end with PostgreSQL and a React front end. The example uses Docker to setup the back end and the database.


## Technologies
* NodeJS / npm
* Express
* React
* TypeScript
* PostgreSQL
* Docker

## Setup

* Download and install NodeJS: [Download](https://nodejs.dev/)
* Download and install Docker: [Get Started](https://www.docker.com/get-started)
* Clone the project `$ git clone https://github.com/richardbrammer/react-express-typescript-example.git`
* Install dependencies for frontend
```
$ cd frontend
$ npm i
```
* The back end dependencies will be installed automatically by Docker

## Development

### 1. Start the back end using `docker-compose`:

```
$ docker-compose build
$ docker-compose up
```

The back end is available at `http://localhost:3000/api/v1/`.

### 2. Start the front end using `npm`:

```
$ cd frontend
$ npm start
```

The front end will try and start at port 3000, which is occupied by the back end. If asked to use a different port, answer with [Y]es.
The front end should be available at the next free port, e.g. `http://localhost:3001`.

Open the url in the browser and test the application.

## Tests

### Front end

```
$ cd frontend
$ npm test
```

### Back end

The back end may be tested using the provided Postman collection. 

## To-do & Improvements

* Improve test coverage
* Create Docker container for front end
* Front end form validation
* Add actual test cases to Postman collection
* Add unit tests to back end