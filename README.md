# Bike Rental Service (Backend)

This **Bike Rental Service** backend service is designed to cater to both tourists and locals, providing a seamless experience for renting bikes. Users can easily rent bikes, manage their profiles, and view available bikes. The application ensures secure authentication and efficient rental management, including detailed cost calculations based on hourly usage. Admins have the ability to manage the bike inventory and oversee user rentals, ensuring smooth operations across the service.

## Table of Contents

- [Live-Site](#live-site)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Live-Site

[![Live-server-side]](https://bike-rental-service-backend-blond.vercel.app/)

## Features

- **Secure Authentication and Authorization:** Users are authenticated using JWT tokens and password hashing with bcrypt.
- **View Available Bikes:** Users can view a list of available bikes along with their details and current availability status.
- **Rent Bikes:** Users can rent bikes on an hourly basis, with the system calculating costs based on the rental duration.
- **Return Bikes and Calculate Costs:** Upon returning a bike, the system provides a summary of the rental period and the total cost incurred.
- **User Profile Management:** Users can view and update their profiles.
- **View Rental History:** Users can see a list of their rented bikes and their rental details.
- **Admin Bike Management:** Admins can add, update, and delete bikes in the system.

## Technology Stack

The following technologies are used in the project:

- **Node.js:** JavaScript runtime built on Chrome's V8 JavaScript engine.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB:** NoSQL database used to store user, bike, and rental information.
- **Zod:** TypeScript-first schema declaration and validation library.
- **JWT:** JSON Web Token used for securely transmitting information between parties as a JSON object.
- **bcrypt:** Library to help hash passwords.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   https://github.com/shadeshsaha/Bike-Rental-Service-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   PORT=5000
   MONGODB_URI=mongodb url
   SALT= // salt bcrypt
   node_ENV= //development or production
   JWT_ACCESS_SECRET= //jwt_secret_key
   JWT_ACCESS_EXPIRES_IN= //expires_in
   ```

4. **Run the server:**

   ```bash
   npm run dev
   ```

## Configuration

Ensure you have a running MongoDB instance. You can set up your MongoDB URI in the `.env` file as shown above.

## Usage

Once the server is running, you can interact with the API using a tool like Postman or through your frontend application. The API listens on the port specified in the `.env` file (default is `5000`).

## API Endpoints

### Authentication

- **Register a new user:**

  ```http
  POST /api/auth/signup
  ```

  **Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St, Anytown",
    "role": "admin"
  }
  ```

- **Login a user:**

  ```http
  POST /api/auth/login
  ```

  **Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

### User Profile

- **Get user profile:**

  ```http
  GET /api/users/me
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

- **Update user profile:**

  ```http
  PUT /api/users/me
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

  **Body:**

  ```json
  {
    "name": "John Updated",
    "phone": "0987654321"
  }
  ```

### Bikes

- **Create a new bike (Admin only):**

  ```http
  POST /api/bikes
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

  **Body:**

  ```json
  {
    "name": "Mountain Bike",
    "description": "A durable mountain bike for rough terrains.",
    "pricePerHour": 15,
    "cc": 250,
    "year": 2022,
    "model": "X1",
    "brand": "Yamaha"
  }
  ```

- **Get all bikes:**

  ```http
  GET /api/bikes
  ```

- **Update bike details (Admin only):**

  ```http
  PUT /api/bikes/:id
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

  **Body:**

  ```json
  {
    "pricePerHour": 20
  }
  ```

- **Delete a bike (Admin only):**

  ```http
  DELETE /api/bikes/:id
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

### Rentals

- **Rent a bike:**

  ```http
  POST /api/rentals
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

  **Body:**

  ```json
  {
    "bikeId": "60df5f8b2f8fb814b56fa181",
    "startTime": "2023-06-08T10:00:00Z"
  }
  ```

- **Return a rented bike and calculate the cost (Admin Only):**

  ```http
  POST /api/rentals/id/return
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

  **Body:**
  No Data

- **Get all rentals:**

  ```http
  GET /api/rentals
  ```

  **Headers:**

  ```http
  Authorization: Bearer jwt_token
  ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code address to the existing style and that you have added tests for any new functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
