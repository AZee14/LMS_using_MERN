# EduVerse — MERN Stack Learning Management System

A full-fledged Learning Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring three user roles, JWT authentication, role-based dashboards, course management, and enrollment tracking.

---

## 🚀 Project Overview

EduVerse is a comprehensive e-learning platform that enables:
- **Students** to browse, enroll in, and track courses
- **Instructors** to create and manage courses with lessons
- **Admins** to oversee the entire platform with analytics

## 🛠️ Technologies Used

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- React Bootstrap & Bootstrap
- React Icons
- React Toastify
- Recharts (Analytics Charts)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js
- Dotenv
- CORS

---

## 📁 Folder Structure

```
lms-mern/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 1. Clone the repository
```bash
git clone <repository-url>
cd lms-mern
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
ADMIN_BOOTSTRAP_SECRET=your_demo_admin_secret
```

To showcase the admin portal without editing MongoDB manually, sign in with any existing account and use the login page's `Admin Demo Access` panel. Enter the account email plus the same `ADMIN_BOOTSTRAP_SECRET` value, and the app will promote that account to admin and open the admin dashboard.

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| **Student** | Register, login, browse courses, enroll, track progress, view profile |
| **Instructor** | Create/edit/delete courses, upload lessons, manage own courses |
| **Admin** | Manage all users, manage all courses, view analytics & reports |

> **Note:** To create an admin user, register a normal user then manually update their role to `admin` in MongoDB:
> ```js
> db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
> ```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |

### Courses
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/courses` | Public | Get all courses |
| GET | `/api/courses/:id` | Public | Get single course |
| POST | `/api/courses` | Instructor/Admin | Create course |
| PUT | `/api/courses/:id` | Instructor/Admin | Update course |
| DELETE | `/api/courses/:id` | Instructor/Admin | Delete course |
| POST | `/api/courses/:id/lessons` | Instructor | Add lesson |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Admin | Get all users |
| DELETE | `/api/users/:id` | Admin | Delete user |
| GET | `/api/users/profile` | Authenticated | Get own profile |
| GET | `/api/users/analytics` | Admin | Get analytics data |

### Enrollment
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/enrollment/enroll` | Student | Enroll in course |
| GET | `/api/enrollment/my-courses` | Student | Get enrolled courses |
| PUT | `/api/enrollment/:id/progress` | Student | Update progress |

---

## 🔐 Security Features
- Password hashing with **Bcrypt**
- JWT-based authentication
- Protected routes (frontend & backend)
- Role-based access control middleware
- Environment variables for sensitive data
- Input validation and error handling

---

## 📊 Database Models

### User Model
- `name`, `email`, `password` (hashed), `role` (student/instructor/admin), `timestamps`

### Course Model
- `title`, `description`, `instructor` (ref), `category`, `price`, `lessons` (embedded), `timestamps`

### Enrollment Model
- `student` (ref), `course` (ref), `progress` (0-100), `enrolledAt`, `timestamps`

---

## 🌐 Deployment

For deployment, update the `.env` file:
1. Replace `MONGO_URI` with your MongoDB Atlas connection string
2. Set a strong `JWT_SECRET`
3. Set `NODE_ENV=production`

---

## 📝 License
This project is for educational purposes.
