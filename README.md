# Prerequisites
- Java 17+
- Maven 3+
- Docker 19.03.0+
- Docker-Compose 1.25.0+
- Node.js 16 & NPM 8
- Ports 5432, 8080 and 4200 are available

# Getting Started
## Setting up the Project
Run these commands to clone the project and install all the required dependencies.
```shell
git clone https://github.com/leonmydla/sda-coding-challenge
cd sda-coding-challenge
docker-compose pull
cd meetings
mvn clean verify -DskipTests
cd ../frontend
npm ci
cd ..
```

## Running the Project
Run this command to start the database, backend and frontend
```shell
docker-compose up & \
cd meetings && mvn org.springframework.boot:spring-boot-maven-plugin:run & \
cd frontend && npm start
```

## Using the application
Open [http://127.0.0.1:4200](http://127.0.0.1:4200) in your Browser.
This will bring up the frontend.

Once opened you'll be able to view demo meetings add new ones.
