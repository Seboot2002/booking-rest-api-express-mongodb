# Booking API

A RESTful API for managing bookings, built with **Express** and **MongoDB** following **Clean Architecture** principles. The API supports CRUD operations for creating, updating, retrieving, and deleting bookings and leverages advanced patterns like **message broker** and **sharding**.

## Technologies

- **Node.js** with **Express**: For server and route management.
- **MongoDB**: NoSQL database.
- **Official MongoDB Driver**: For direct communication with MongoDB.
- **Clean Architecture**: Ensures a clear separation of layers (repository, use case, controller).
- **Docker**: For containerizing microservices and managing their deployment.
- **Message Broker**: To facilitate communication between services.
- **Sharding**: Ensures scalability and efficient handling of data distribution.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4 or higher)
- **npm** (Node package manager)
- Docker and Docker Compose (latest versions recommended).
- MongoDB with sharding enabled.
- A message broker like Kafka or RabbitMQ (ensure it's configured).

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/Seboot2002/booking-rest-api-express-mongodb.git
    ```

2. Build and start the Docker containers in each carpet:

    ```
    docker-compose up --build
    ```

3. When all services are ready you can start making api calls:

    ```
    POST http://localhost:3010/api/user
    Content-Type: application/json

    {
        "email": "user@gmail.com",
        "password": "123"
    }

    ###

    POST http://localhost:3010/api/user/login
    Content-Type: application/json

    {
        "email": "user@gmail.com",
        "password": "123"
    }

    ###

    GET http://localhost:3010/api/user
    Authorization: qwertyuiooppasldkasldksladlksanfnfmsdnfsjhjcx
    
    ```