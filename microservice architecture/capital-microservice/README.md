# Booking API

A RESTful API for managing bookings, built with **Express** and **MongoDB** following **Clean Architecture** principles. The API supports CRUD operations for creating, updating, retrieving, and deleting bookings.

## Technologies

- **Node.js** with **Express**: For server and route management.
- **MongoDB**: NoSQL database.
- **Official MongoDB Driver**: For direct communication with MongoDB.
- **Clean Architecture**: Ensures a clear separation of layers (repository, use case, controller).

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4 or higher)
- **npm** (Node package manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Seboot2002/booking-rest-api-express-mongodb.git
2. Install the dependencies:

    ```bash
    cd booking-rest-api-express-mongodb
    npm install
3. Create a .env file in the project root and configure the following variables:

    ```bash
    MONGO_URI='mongodb://localhost:27017'
    PORT=3000
    DB_NAME='YourDbName'
4. Start the API:

    ```bash
    npm run start
5. For development, use the following command to run the API with nodemon for automatic reloading:

    ```bash
    npm run dev