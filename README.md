# TrackExpense — Full-Stack Expense Tracker

A full-stack expense tracking application built with **Django REST Framework** and **React (Vite)**, featuring JWT authentication, category-based expense tracking, and spend visualization.

**Live demo:** [https://track-expense-omega.vercel.app](https://track-expense-omega.vercel.app)

---

## Features

- 🔐 User registration and login with JWT authentication (access + refresh tokens)
- 💰 Add, view, and delete expenses with title, amount, date, category, and notes
- 🏷️ Category-based organization (Food, Transport, Rent, Utilities, Entertainment)
- 📊 Dashboard with total spend, monthly spend, and top category stats
- 🥧 Interactive pie chart showing spend breakdown by category
- 🔄 Auto-refreshing data — no page reload needed after adding/deleting expenses
- 🔑 Auto-refresh of expired access tokens via Axios interceptors

---

## Tech Stack

**Backend**
- Django + Django REST Framework
- `djangorestframework-simplejwt` — JWT authentication
- `django-cors-headers` — CORS handling
- PostgreSQL (production) / SQLite (local development)
- `gunicorn` + `whitenoise` — production server and static file serving

**Frontend**
- React (Vite)
- Axios (with interceptors for auth token refresh)
- Recharts — pie chart visualization

**Deployment**
- Backend: [Render](https://render.com)
- Frontend: [Vercel](https://vercel.com)

---

## Project Structure

```
TrackExpense/
├── backend/
│   ├── backend/          # Django project settings, urls, wsgi
│   ├── accounts/         # User registration, JWT login/refresh
│   ├── expenses/         # Expense & Category models, views, serializers
│   ├── build.sh          # Render build script
│   ├── requirements.txt
│   └── manage.py
└── frontend/
    ├── src/
    │   ├── api.js             # Axios instance + interceptors
    │   ├── App.jsx
    │   ├── App.css
    │   └── components/
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       ├── ExpenseForm.jsx
    │       ├── ExpenseList.jsx
    │       ├── Stats.jsx
    │       └── Summary.jsx
    └── vite.config.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Log in, returns access + refresh tokens |
| POST | `/api/auth/refresh/` | Get a new access token |
| GET | `/api/categories/` | List all categories |
| GET | `/api/expenses/` | List the logged-in user's expenses |
| POST | `/api/expenses/` | Create a new expense |
| DELETE | `/api/expenses/<id>/` | Delete an expense |
| GET | `/api/summary/` | Get total, monthly total, and by-category breakdown |

All endpoints except register/login/refresh require a valid JWT in the `Authorization: Bearer <token>` header.

---

## Local Setup

### Backend

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```
SECRET_KEY=your-local-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:5173
```

```bash
python manage.py migrate
python manage.py seed_categories
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:8000/api/
```

```bash
npm run dev
```

---

## Deployment Notes

- **Backend (Render):** Build command `bash build.sh`, start command `gunicorn backend.wsgi:application`. Requires a PostgreSQL instance and the environment variables listed above (with production values), plus `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_EMAIL`, and `DJANGO_SUPERUSER_PASSWORD` for automatic superuser creation on deploy.
- **Frontend (Vercel):** Root directory set to `frontend`, with `VITE_API_URL` set to the live Render API URL in Vercel's environment variables.
- `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` on Render must match the deployed Vercel URL exactly (no trailing slash).

---

