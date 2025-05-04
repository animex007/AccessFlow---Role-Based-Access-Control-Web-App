


# 🔐 AccessFlow - Role-Based Access Control Web App

AccessFlow is a scalable Role-Based Access Control (RBAC) backend system built with Node.js, Express.js, and MongoDB. It enables secure user authentication and fine-grained authorization based on user roles like `Admin`, `Manager`, and `User`.

---

## 🚀 Features

- 🔐 **User Authentication**: Register & Login using JWT tokens.
- 🧾 **Role-Based Access Control**: Route access based on user roles.
- 🧱 **Scalable Folder Structure**: Enterprise-grade code organization.
- 🧮 **MongoDB Integration**: Schema-based models with Mongoose.
- 🔁 **Middleware Driven**: Authentication and role validation handled through reusable middlewares.
- 🌱 **.env Configuration**: Secure environment configuration.
- 🧰 **Modular Codebase**: Easy to extend and maintain.

---

## 🧑‍💻 Tech Stack

| Category     | Tech                                      |
|--------------|-------------------------------------------|
| Backend      | Node.js, Express.js                       |
| Database     | MongoDB, Mongoose                         |
| Auth         | JWT (JSON Web Tokens), bcrypt             |
| Environment  | dotenv                                    |
| Testing Tool | Postman                                   |
| Version Ctrl | Git & GitHub                              |

---

## 📁 Folder Structure

```
backend/
│
├── config/           # MongoDB connection logic
│   └── db.js
│
├── controllers/      # Request handlers for routes
│   └── authController.js
│
├── middlewares/      # Auth, role-checking middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/           # Mongoose models
│   └── User.js
│
├── routes/           # API route definitions
│   └── authRoutes.js
│
├── .env              # Environment variables
├── app.js            # Main Express app setup
└── server.js         # Entry point to start the server
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of your project and add the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/accessflow
JWT_SECRET=yourSuperSecretKey
```

---

## 🧪 API Endpoints

### ✅ Register

- **URL**: `POST /api/auth/register`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

### 🔐 Login

- **URL**: `POST /api/auth/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "token": "<JWT_TOKEN>"
}
```

### 🔒 Protected Route

- **URL**: `GET /api/admin/dashboard`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Access**: Admins only

---

## ✅ Roles Supported

| Role    | Description                        |
|---------|------------------------------------|
| admin   | Full access to system              |
| manager | Moderate access                    |
| user    | Limited access to specific routes  |

---

## 🧰 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/accessflow.git
cd accessflow/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment File

Create a `.env` file and add:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/accessflow
JWT_SECRET=supersecretkey
```

### 4. Run the Server

```bash
node server.js
```

### 5. Test with Postman

Use Postman to test:
- `POST /api/auth/register`
- `POST /api/auth/login`
- Use the JWT token in `Authorization` header for protected routes

---

## 🚦 Future Improvements

- ✅ Add refresh token & token expiry
- ✅ Integrate email verification
- ✅ Add UI with React or Flutter
- ✅ Activity logs for user actions
- ✅ RBAC from database (dynamic permissions)

---

## 🙌 Contributing

Want to improve AccessFlow? Feel free to fork this repo and raise a PR!

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Credits

Built with 💻 by animex007

