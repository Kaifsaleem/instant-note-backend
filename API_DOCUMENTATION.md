# Post Creator Backend API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

The API uses JWT for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication

#### Register a new user

```
POST /users/signup
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // Optional, defaults to "user"
}
```

**Response (201 Created):**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-06-22T10:15:23.456Z"
    }
  }
}
```

#### Login

```
POST /users/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-06-22T10:15:23.456Z"
    }
  }
}
```

### User Management

#### Get User Profile

```
GET /users/profile
```

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-06-22T10:15:23.456Z"
    }
  }
}
```

#### Update User Profile

```
PATCH /users/profile
```

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Smith",
      "email": "john.smith@example.com",
      "role": "user",
      "createdAt": "2023-06-22T10:15:23.456Z"
    }
  }
}
```

#### Get All Users (Admin Only)

```
GET /users
```

**Headers:**

```
Authorization: Bearer <admin-jwt-token>
```

**Response (200 OK):**

```json
{
  "status": "success",
  "results": 2,
  "data": {
    "users": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "createdAt": "2023-06-22T10:15:23.456Z"
      },
      {
        "_id": "60d21b4667d0d8992e610c86",
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin",
        "createdAt": "2023-06-22T11:30:45.789Z"
      }
    ]
  }
}
```

### Link Management

#### Get All Links

```
GET /links/all
```

**Response (200 OK):**

```json
{
  "status": "success",
  "results": 2,
  "data": {
    "links": [
      {
        "_id": "60d21b4667d0d8992e610c87",
        "url": "https://example.com",
        "title": "Example Website",
        "description": "An example website for testing",
        "createdBy": "60d21b4667d0d8992e610c85",
        "createdAt": "2023-06-22T12:45:23.456Z",
        "updatedAt": "2023-06-22T12:45:23.456Z"
      },
      {
        "_id": "60d21b4667d0d8992e610c88",
        "url": "https://another-example.com",
        "title": "Another Example Website",
        "description": "Another example website for testing",
        "createdBy": "60d21b4667d0d8992e610c86",
        "createdAt": "2023-06-22T13:10:45.789Z",
        "updatedAt": "2023-06-22T13:10:45.789Z"
      }
    ]
  }
}
```

#### Get Link by ID

```
GET /links/:id
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "link": {
      "_id": "60d21b4667d0d8992e610c87",
      "url": "https://example.com",
      "title": "Example Website",
      "description": "An example website for testing",
      "createdBy": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-06-22T12:45:23.456Z",
      "updatedAt": "2023-06-22T12:45:23.456Z"
    }
  }
}
```

#### Create a Link

```
POST /links
```

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**

```json
{
  "url": "https://example.com",
  "title": "Example Website",
  "description": "An example website for testing"
}
```

**Response (201 Created):**

```json
{
  "status": "success",
  "data": {
    "link": {
      "_id": "60d21b4667d0d8992e610c87",
      "url": "https://example.com",
      "title": "Example Website",
      "description": "An example website for testing",
      "createdBy": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-06-22T12:45:23.456Z",
      "updatedAt": "2023-06-22T12:45:23.456Z"
    }
  }
}
```

#### Update a Link

```
PATCH /links/:id
```

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**

```json
{
  "title": "Updated Example Website",
  "description": "Updated description"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "link": {
      "_id": "60d21b4667d0d8992e610c87",
      "url": "https://example.com",
      "title": "Updated Example Website",
      "description": "Updated description",
      "createdBy": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-06-22T12:45:23.456Z",
      "updatedAt": "2023-06-22T14:15:23.456Z"
    }
  }
}
```

#### Delete a Link

```
DELETE /links/:id
```

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**Response (204 No Content)**

## Error Responses

### Validation Error (400 Bad Request)

```json
{
  "status": "fail",
  "message": "Validation error",
  "errors": {
    "url": "URL is required",
    "title": "Title must be at least 3 characters long"
  }
}
```

### Authentication Error (401 Unauthorized)

```json
{
  "status": "fail",
  "message": "You are not logged in. Please log in to get access"
}
```

### Permission Error (403 Forbidden)

```json
{
  "status": "fail",
  "message": "You do not have permission to perform this action"
}
```

### Not Found Error (404 Not Found)

```json
{
  "status": "fail",
  "message": "Link not found"
}
```

### Server Error (500 Internal Server Error)

```json
{
  "status": "error",
  "message": "Something went wrong"
}
```

## Interactive API Documentation

Interactive API documentation is available via Swagger UI at:

```
http://localhost:3000/api-docs
```
