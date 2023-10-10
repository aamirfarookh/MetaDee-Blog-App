# Blog Application README

This is a simple blog application built using Node.js, Express, MongoDB, and AWS S3 for image storage. The application provides API endpoints for managing users and blogs.

## Getting Started

Before running the application, make sure you have Node.js installed on your machine. You will also need to create an `.env` file in the root directory with the following environment variables:

```
mongo_URL=your_mongodb_connection_string
PORT=your_preferred_port_number
TokenSecret=your_jwt_secret
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_ACCESS_KEY_ID=your_aws_access_key_id
```

### Installation

1. Clone the repository to your local machine.

```
git clone https://github.com/aamirfarookh/MetaDee-Blog-App.git
```

2. Install the project dependencies using npm.

```
cd MetaDee-Blog-App
npm install
```

3. Start the application.

```
npm run server
```

The server should now be running on the specified port.

## Endpoints

### User Management

#### User Signup

- Endpoint: `POST /user/signup`
- Description: Create a new user account.
- Request Body:
  - `name`: User's name
  - `email`: User's email
  - `password`: User's password
- Response:
  - 201 Created: User account created successfully.
  - 400 Bad Request: Invalid request data.
  - 500 Internal Server Error: Server error.

#### User Login

- Endpoint: `POST /user/login`
- Description: Authenticate and login a user.
- Request Body:
  - `email`: User's email
  - `password`: User's password
- Response:
  - 200 OK: Authentication successful. Returns an access token.
  - 401 Unauthorized: Authentication failed.
  - 500 Internal Server Error: Server error.

### Blog Management

#### Create a Blog Post

- Endpoint: `POST /blogs/create`
- Description: Create a new blog post with an optional image upload to AWS S3.
- Request Body:
  - `title`: Title of the blog post
  - `description`: Description of the blog post
- Request Headers:
  - `Authorization`: JWT token for user authentication
- Response:
  - 201 Created: Blog post created successfully.
  - 400 Bad Request: Invalid request data.
  - 401 Unauthorized: Authentication failed.
  - 500 Internal Server Error: Server error.

#### Get All Blog Posts

- Endpoint: `GET /blogs/allblogs`
- Description: Retrieve all blog posts.
- Response:
  - 200 OK: Returns a list of all blog posts.
  - 401 Unauthorized: Authentication failed.
  - 500 Internal Server Error: Server error.

#### Update a Blog Post

- Endpoint: `PATCH /blogs/update/:id`
- Description: Update an existing blog post by ID.
- Request Body (Optional):
  - `title`: New title for the blog post
  - `description`: New description for the blog post
- Request Headers:
  - `Authorization`: JWT token for user authentication
- Response:
  - 200 OK: Blog post updated successfully.
  - 400 Bad Request: Invalid request data.
  - 401 Unauthorized: Authentication failed.
  - 500 Internal Server Error: Server error.

#### Delete a Blog Post

- Endpoint: `DELETE /blogs/delete/:id`
- Description: Delete an existing blog post by ID.
- Request Headers:
  - `Authorization`: JWT token for user authentication
- Response:
  - 204 No Content: Blog post deleted successfully.
  - 401 Unauthorized: Authentication failed.
  - 500 Internal Server Error: Server error.

#### Search for Blog Posts

- Endpoint: `GET /blogs/search`
- Description: Search for blog posts based on title of blog.
- Query Parameters (Optional):
  - `title`: Search query
- Response:
  - 200 OK: Returns a list of matching blog posts.
  - 500 Internal Server Error: Server error.

## Dependencies

This application uses the following npm packages:

- aws-sdk
- bcrypt
- dotenv
- express
- jsonwebtoken
- mongoose
- multer

## Contributors

- [Amir Bhat](https://github.com/aamirfarookh)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
