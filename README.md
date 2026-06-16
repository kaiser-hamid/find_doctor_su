# 🩺 Find Doctor — Super Admin Dashboard

React.js super admin panel for the Find Doctor platform.
Provides administrators with full control over doctors,
patients, appointments, and platform content — built with
React, Vite, Redux Toolkit, and Tailwind CSS.

🔗 **Related Repositories**
- [REST API Backend (Node.js/Express)](https://github.com/kaiser-hamid/find_doctor_api)
- [Patient Frontend (Next.js)](https://github.com/kaiser-hamid/find_doctor_frontend)

---

## ✨ Features

- Secure admin login with JWT authentication
- Dashboard overview with platform statistics
- Doctor management — approve, edit, and manage 
  doctor profiles and qualifications
- Patient/user management — view, update, delete accounts
- Appointment oversight — view and manage all platform 
  appointments
- Data tables with sorting and search
- Redux Toolkit for global state management
- Fast development and build with Vite

---

## 🛠️ Tech Stack

**Framework:** React.js  
**Build Tool:** Vite  
**State Management:** Redux Toolkit, React-Redux  
**Styling:** Tailwind CSS  
**HTTP Client:** Axios  

---

## 🚀 Getting Started

### Requirements
- Node.js 18+
- Running instance of [find_doctor_api](https://github.com/kaiser-hamid/find_doctor_api)

### Installation

```bash
git clone https://github.com/kaiser-hamid/find_doctor_su.git
cd find_doctor_su
npm install
cp .env.example .env
npm run dev
```

### Environment Variables

VITE_API_URL=http://localhost:5000/api

Open [http://localhost:5173](http://localhost:5173) to view in browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

src/

├── components/       # Reusable UI components

├── pages/            # Page components

├── store/            # Redux Toolkit slices

├── hooks/            # Custom React hooks

└── utils/            # Helper functions

public/               # Static assets

index.html            # App entry point

vite.config.js        # Vite configuration

---

## 🔮 Planned Improvements

- Analytics charts for appointments and registrations
- Role-based access (super admin / admin)
- Export data to CSV
- TypeScript migration
