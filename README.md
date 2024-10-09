# Routes using CURL

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
