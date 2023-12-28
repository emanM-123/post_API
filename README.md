# post_API
# post API

## Overview

This project is a Node.js and mongoose-based application that provides user registration, user login, JWT token verification, and CRUD operations for posts. Users need to be authenticated to perform certain actions.

## Features

- User Registration:
  - While registering, the user's password is encrypted using a 'pre' method.

- User Login:
  - User authentication through login.

- JWT Token Verification:
  - JWT (JSON Web Token) is used to verify user identity.

- Create posts:
  - User authentication is necessary to add new posts.

- Read All posts:
  - User authentication is required to view the list of posts.

- Update post:
  - User authentication is necessary to modify post information.

- Delete post:
  - User authentication is required to delete a post.

## Technologies Used

- Node.js
- mongoose
- JWT (JSON Web Token)

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a .env file for environment variables.

## Environment Variables (.env)

Create a `.env` file in the root directory and set the following environment variables:

NODE_ENV=dev
NODE_PORT=8000
ACCESS_TOKEN_SECRET=random
ACCESS_TOKEN_EXPIRED=86400


## Usage

1. Run the application using `npm run dev`.
2. Access the application through your preferred web browser.


