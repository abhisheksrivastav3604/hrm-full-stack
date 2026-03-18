# HRMS Lite – Human Resource Management System

**Human Resource Management System** built with **React + Javascript** (frontend) and **FastAPI + Python** (backend), featuring a professional UI,stats dashboard, employee management, and attendance tracking.

---

## Live Demo
| Layer    | URL |
|----------|-----|
| Frontend | https://hrm-frontend-eta.vercel.app/dashboard |
| Backend  | https://hrm-backend-pe09.onrender.com |
| API Docs | https://hrm-backend-pe09.onrender.com/docs |

---

## Features

### Core
- **Dashboard** – Live attendance rate, stat cards, recent employees, quick-action shortcuts
- **Employee Management** – Add, search, filter by department, view details, delete (with cascade)
- **Attendance Tracking** – Mark attendance (Present / Absent / Late / Half Day), edit records, date-range filter



---

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server



## Running Locally

### Prerequisites
- Python 3.11+
- Node.js 18+

### 1 – Backend

```bash
cd backend

# Install deps
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload --port 8000
```

> API will be available at `http://localhost:8000`  
> Interactive docs: `http://localhost:8000/docs`

### 2 – Frontend

```bash
cd frontend

# Install deps
npm install

# Start dev server
npm run dev
```

> App will be available at `http://localhost:5173`



## API Endpoints

### Employee

 - GET   -  `/api/employee`  - List all (with search/dept filter) 
 - POST  -  `/api/employee`  - Create employee 
 - PUT   -  `/api/employee/{id}`  - Update employee 
 - DELETE - `/api/employee/{id}`  - Delete employee 
 - GET   -  `/api/employee/department`  - Distinct department 

### Attendance

- GET    - `/api/attendance` - List (filter by date, employee, status) 
- POST   - `/api/attendance` - Mark attendance 
- PUT    - `/api/attendance/{id}` - Update record 
- DELETE - `/api/attendance/{id}` - Delete record 

### Dashboard

- GET    - `/api/dashboard/stats` - Stats summary 


