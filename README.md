# Blog Platform

Welcome to the **Blog Platform**! This backend system provides a robust foundation for a blogging platform, enabling users to create, update, and delete blogs while ensuring secure authentication and role-based access control.

## 🚀 Features

- **User Authentication & Authorization**: Secure login and registration system.
- **Role-Based Access Control**: Admin and User roles with distinct permissions.
- **Admin Privileges**:
  - Block users.
  - Delete any blog.
- **User Privileges**:
  - Create, update, and delete their own blogs.
- **Public Blog Access**: View blogs with search, sort, and filter functionalities.

## 🛠️ Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**

## 📌 Getting Started

Follow these steps to set up the project locally:

### 1️⃣ Clone Repository

```sh
git clone https://github.com/Sazz07/blog-backend.git
cd blog-backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

- Rename `.env.example` to `.env`
- Update the `DATABASE_URL` variable with your MongoDB connection URI.
- Update the `JWT_ACCESS_SECRET` token.

### 4️⃣ Start the Server

```sh
npm run start:dev
```

## 🌐 Base URL

```
https://blog-backend-ten-beta.vercel.app/
```

## 🔑 Authentication Endpoints

### Register User

**POST** `/api/auth/register`

### Login User

**POST** `/api/auth/login`

---

## 📝 Blog Management

### Create Blog (User Only)

**POST** `/api/blogs`

### Update Blog (User Only)

**PATCH** `/api/blogs/:id`

### Delete Blog (User Only)

**DELETE** `/api/blogs/:id`

### Get All Blogs (Public)

**GET** `/api/blogs`

#### Query Parameters:

- `search`: Search blogs by title or content.
- `sortBy`: Sort by fields (e.g., `createdAt`, `title`).
- `sortOrder`: `asc` (ascending) or `desc` (descending).
- `filter`: Filter blogs by `authorId` (e.g., `filter=authorId`).

---

## 🔧 Admin Actions

### Block User

**PATCH** `/api/admin/users/:userId/block`

### Delete Blog

**DELETE** `/api/admin/blogs/:id`

---

## 🔐 Authentication & Authorization

- Users must log in to create, update, or delete blogs.
- Admins can manage users and blogs but cannot modify content.
- Role-based access ensures secure operations.

### 🔑 Token Pattern

**Request Header:**

```sh
Authorization: Bearer <token>
```

### 📌 Admin Credentials

```json
{
  "email": "admin@gmail.com",
  "password": "admin1234"
}
```

---

## 🏗️ Models

### User Model

```ts
{
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user'; // Default: "user"
  isBlocked: boolean; // Default: false
  createdAt: Date;
  updatedAt: Date;
}
```

### Blog Model

```ts
{
  title: string;
  content: string;
  author: ObjectId;
  isPublished: boolean; // Default: true
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🛠️ Error Handling

A consistent error response structure ensures better debugging and user experience.

### Common Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional error details" },
  "stack": "error stack trace"
}
```

### Types of Errors Handled

- **Validation Errors** (e.g., incorrect input format).
- **Authentication & Authorization Errors**.
- **Resource Not Found** (e.g., non-existent blog/user).
- **Internal Server Errors**.
