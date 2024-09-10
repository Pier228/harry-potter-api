<p align="center">
  <img src="https://i.ibb.co/VW97KVV/pngwing-com.png" width="250" alt="Harry Potter Logo" />
</p>

# Harry Potter Universe API

Welcome to the Harry Potter Universe API! This API provides access to a rich set of data related to the Harry Potter universe, including spells, potions, movies, characters, and books. Additionally, it features an AI-powered endpoint for answering any Harry Potter-related questions.

## Project Description

The **Harry Potter Universe API** is a comprehensive tool that allows developers to access a wealth of information related to the world of Harry Potter. This API is designed to provide data on spells, potions, movies, characters, and books from the beloved series. In addition to retrieving data, the API features an AI-powered endpoint capable of answering any question related to the Harry Potter universe. This functionality makes it a versatile resource for developers building fan websites, trivia games, or educational tools related to the Harry Potter world.

The API is built using **NestJS**, with **PostgreSQL** as the database managed through **Prisma ORM**. The database is hosted on **Supabase**, ensuring secure and scalable data storage. The admin panel allows authorized users to manage the content, including full CRUD operations on books, characters, movies, potions, and spells.

Security is a key aspect of this API. Only administrators can register and authenticate, ensuring that sensitive operations like database management are restricted to authorized users. Authentication is handled via **JWT**, with tokens that are valid for 4 hours. To protect the API from abuse, **rate limiting** is implemented, capping requests at 50 per minute. Additionally, **caching** is enabled on all GET requests to improve performance.

This API is also equipped with comprehensive documentation through **Swagger**, making it easy for developers to explore and integrate the various endpoints into their projects.

## Features
- **Spells, Potions, Movies, Characters, and Books:** Retrieve detailed information about various aspects of the Harry Potter universe.
- **AI-powered Q&A:** Communicate with an AI that can answer any question related to the Harry Potter universe.
- **Admin Panel:** Manage the database of spells, potions, movies, characters, and books through a powerful admin panel with full CRUD operations.
- **Authentication:** Admin registration and login via JWT for secure access to the admin panel.
- **Rate Limiting:** Protection from spam with a limit of 50 requests per minute.
- **Caching:** Automatic caching on all `GET` requests for faster response times.
- **Swagger Documentation:** A detailed API documentation is available via the `/api` endpoint.

## Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com)
- **Database:** PostgreSQL (hosted on [Supabase](https://supabase.com))
- **ORM:** [Prisma](https://www.prisma.io/)
- **AI:** [Mixtral](https://mixtral.ai)
- **Authentication:** JWT for admin access
- **Documentation:** Swagger
- **Rate Limiting:** 50 requests per minute
- **Caching:** Enabled on all `GET` requests

## Swagger API Documentation

For a detailed overview of the available API endpoints, request/response structures, and data models, the Swagger documentation is available at `/api`. This documentation provides interactive API exploration and helps developers understand and integrate with the API efficiently.

## Rate Limiting

To prevent overloading, the API has a built-in rate limiting mechanism allowing **50 requests per minute**.

## Caching

All `GET` requests are automatically cached for better performance and reduced load.

## Authentication

Only administrators are required to register and authenticate. Upon successful registration with a secret key, admins can log in and obtain a JWT token, which is needed for making authorized requests to the admin panel. JWT tokens are valid for **4 hours**.

### Admin Registration

To register as an admin, you need to provide a valid secret key. After registration, you will be able to log in and access your admin credentials.
```bash
POST admin-panel/auth/reg
```

### Admin Login

Admins can log in with their credentials to receive a JWT token, which must be included in the headers of all requests to access the admin panel.
```bash
POST admin-panel/auth/log
```

### Using JWT Token

Include the JWT token in the Authorization header for authorized requests:
```bash
authorization: your-token
```

## Installation

```bash
$ git clone https://github.com/Pier228/harry-potter-api.git
$ cd harry-potter-api
$ npm install
```

## Environment Variables

To run this application, you need to set up several environment variables. Create a `.env` file in the root directory of the project and add the following variables:

- `DATABASE_URL`: Database connection url
- `PORT`: Server port
- `DIRECT_URL`: Direct connection to the database. Used for migrations
- `AUTH_KEY`: Authorization key
- `JWT_SECRET`: JWT secret
- `HASH_LVL`: Hash lever for password encryption
- `AI_KEY`: Key for AI assistant
- `AI_MODEL`: AI assistant model
- `AI_SETTINGS`: Settings for the AI assistant 

Also you can see example of needed environment variables in [.env.example](/.env.example)

## Running the app

After setting up the .env file, you can start the application using the following commands:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
