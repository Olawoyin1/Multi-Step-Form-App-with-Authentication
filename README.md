# Multi-Step Form App with Authentication

## 📌 Overview
This is a **Multi-Step Form Application** built with **React (Frontend)** and **Django REST Framework (Backend)**. It includes **user authentication**, OTP-based email verification, and form validation.

## 🚀 Features
- Multi-step registration process
- User authentication (Signup, Login, Logout)
- Email OTP verification
- Form validation with error handling
- JWT-based authentication
- API integration for seamless frontend-backend communication

## 🛠️ Tech Stack
### Frontend:
- React.js
- UseContext (State Management)
- Bootstrap CSS
- Axios (API Calls)

### Backend:
- Django REST Framework
- SQLite
- Simple JWT (Authentication)
- Brevo (Sendinblue) (for email correspondence)

---

## 🎯 Setup & Installation

### 🖥️ Backend Setup
```sh
git clone https://github.com/Olawoyin1/Multistep-form-backend.git
cd Multistep-form-backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
**Environment Variables (.env file):**
```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_password
```

---

### 🌐 Frontend Setup
```sh
git clone https://github.com/Olawoyin1/Multi-Step-Form-App-with-Authentication.git
cd Multi-Step-Form-App-with-Authentication
npm install
npm start
```

---

## 🔗 API Endpoints
### Authentication
- `POST /register/` - Register a new user
- `POST /login/` - Login user & get JWT token
- `POST /logout/` - Logout user
- `POST /verify-otp/` - Verify email OTP
- `POST /send-otp/` - Send OTP

---

## 🚀 Deployment
### Backend:
1. Deploy on **Render/Heroku** (Ensure PostgreSQL is configured)
2. Set up **SMTP email service** for OTP verification

### Frontend:
1. Deploy on **Netlify/Vercel**
2. Update **API Base URL** to production backend

---


---

## 📩 Contact
For any issues or contributions, reach out **Olawoyin Yusuf Gbolahan**
- GitHub: [@olawoyin1](https://github.com/olawoyin1)
- Email: yustee2017@gmail.com

---
### 🎉 Happy Coding! 🚀
