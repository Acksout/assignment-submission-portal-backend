# Assignment Management System - BACKEND

## Project Overview

This Assignment Management System is a robust web application designed to streamline the process of creating, submitting, and managing assignments between administrators and students. It provides a secure and efficient platform for educational institutions to handle their assignment workflows.

## Features

- User authentication and authorization (Admin and Student roles)
- Assignment creation and management
- Assignment submission
- Assignment status updates (accept/reject)
- Viewing student submissions

## Tech Stack

This project is built using modern web technologies:

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **API Testing**: Can be done using cURL or Postman

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (latest LTS version)
- MongoDB (latest stable version)

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/Acksout/assignment-submission-portal-backend
   cd into the project directory
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Copy the `.env.sample` file to a new file named `.env`
   - Fill in the required values in the `.env` file:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/your_database_name
     JWT_SECRET=your_secret_key
     ```

4. Start the server:
   ```
   npm start
   ```

The server should now be running on `http://localhost:3000` (or the port you specified in the .env file).

## API Documentation

Detailed examples of how to use the API endpoints can be found in the "Application Routes" section of this README.

## Security

This application implements several security measures:

- JWT for secure authentication
- Role-based access control
- Input validation and sanitization

# Application Routes

## Routes using CURL

## User Routes:

a. Register a new user:

```
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

b. User login:

```
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

## Admin Routes:

a. Register a new admin:

```
curl -X POST http://localhost:3000/api/admins/register \
  -H "Content-Type: application/json" \
  -d '{"username": "adminuser", "password": "adminpass123"}'
```

b. Admin login:

```
curl -X POST http://localhost:3000/api/admins/login \
  -H "Content-Type: application/json" \
  -d '{"username": "adminuser", "password": "adminpass123"}'
```

c. Get admins (requires authentication):

```
curl -X GET http://localhost:3000/api/users/admins \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Assignment Routes:

a. Create a new assignment (requires authentication):

```
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"adminId": "ADMIN_ID", "task": "This is a test assignment", "title": "Test Assignment", "dueDate": "2024-12-12"}'
```

b. Get all assignments (requires admin authentication):

```
curl -X GET http://localhost:3000/api/assignments \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

c. Accept an assignment (requires admin authentication):

```
curl -X POST http://localhost:3000/api/assignments/ASSIGNMENT_ID/accept \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

d. Reject an assignment (requires admin authentication):

```
curl -X POST http://localhost:3000/api/assignments/ASSIGNMENT_ID/reject \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

e. Submit work for an assignment (requires authentication):

```
curl -X POST http://localhost:3000/api/assignments/ASSIGNMENT_ID/upload \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"submitData": "This is my completed assignment"}'
```

f. Get student submissions (requires admin authentication):

```
curl -X GET http://localhost:3000/api/assignments/student/STUDENT_IDENTIFIER \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```
