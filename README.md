# 📋 Student Task Manager — Frontend

A React + Vite frontend for the Student Task Manager app with JWT Authentication,
Study Dashboard, and area-wise task organization.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| API Calls | Axios |
| Styling | CSS (custom) |
| Auth | JWT (stored in localStorage) |

---

## ⚙️ Setup & Run

### 1. Clone the project
```bash
git clone https://github.com/chethanyan/student-task-manager-frontend.git
cd student-task-manager-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the app
```bash
npm run dev
```
App runs on `http://localhost:5173`

> Make sure the backend is running on `http://localhost:8080`

---

---

## 🔐 Auth Flow

### Register
### Register

POST http://localhost:8080/api/auth/register
Body: { username, password }


### Login

POST http://localhost:8080/api/auth/login
Body: { username, password }
Response: { token: "eyJhbGci..." }
→ Token saved to localStorage
### Protected Requests
Every task API call automatically sends:
Authorization: Bearer <token>
This is handled by an **Axios interceptor** in `taskApi.js` —
no manual token attachment needed anywhere in the app.

---

## 📡 API Calls

### Auth — `src/api/authApi.js`
| Function | Method | Endpoint |
|---|---|---|
| `register(data)` | POST | /api/auth/register |
| `login(data)` | POST | /api/auth/login |

### Tasks — `src/api/taskApi.js`
| Function | Method | Endpoint | Auth |
|---|---|---|---|
| `getTasks()` | GET | /api/tasks | 🔒 JWT |
| `createTask(task)` | POST | /api/tasks | 🔒 JWT |
| `updateTask(id, task)` | PUT | /api/tasks/:id | 🔒 JWT |
| `deleteTask(id)` | DELETE | /api/tasks/:id | 🔒 JWT |

---

## ✅ Features

- 🔐 JWT Login & Register
- 🏠 Home Dashboard with task stats
- 📚 Study Area — subject progress, tasks & notes
- ➕ Add, ✏️ Edit, ❌ Delete tasks
- 🔄 Auto token injection via Axios interceptor
- 💼 Work, 🏢 Business, 🏠 Personal areas (coming soon)

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run in development mode |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## 🔗 Related Repository

Backend → [student-task-manager-backend](https://github.com/chethanyan/student-task-manager)

---

## 👨‍💻 Developer

Built by **chethanyan**


