# 🚀 CareerForge Pro

An AI-powered full-stack Resume Builder SaaS built with React, Vite, Node.js, Express, Docker, and Tailwind CSS.

CareerForge Pro helps users create professional resumes, optimize resumes for ATS systems, generate AI-powered cover letters, analyze job descriptions, and improve existing resumes using AI.

---
# 🌐 Live Demo

Live URL: https://careerforge-pro-1-gt0e.onrender.com

---

# 🚀 Deployment

This project is deployed on Render using separate frontend and backend services.

- Frontend deployed as Static Site
- Backend deployed as Web Service
- Connected using Environment Variables and CORS
- Production Ready Deployment

---

# 📁 Project Structure

```bash
CareerForge-Pro/
├── frontend/        # React Frontend (Vite + Tailwind CSS)
├── backend/         # Node.js + Express Backend
├── docker-compose.yml
├── README.md
```

---

# 🧠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript
- Context API

## Backend
- Node.js
- Express.js
- Puppeteer

## AI Integration
- Groq AI API (llama-3.3-70b-versatile)

## DevOps
- Docker
- Docker Hub

---

# ⚙️ Local Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/vimalrajput05/CareerForge-Pro.git
```

```bash
cd CareerForge-Pro
```

---

# 🖥️ Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# ⚡ Backend Setup

Open another terminal:

```bash
cd backend
```

```bash
npm install
```

Create `.env` file inside backend folder:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔑 Groq API Key Setup

This project uses Groq AI API for AI-powered resume features.

## Step 1 — Get Free API Key

Open:

https://console.groq.com

- Sign up using Google
- Go to API Keys
- Create API Key
- Copy the key starting with `gsk_`

---

## Step 2 — Create `.env` File in Frontend

Inside `frontend/` folder create:

```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxx
```

Replace with your actual API key.

---

# 🐳 Docker Setup

This project is fully containerized using Docker.

## Build Containers

Run from root folder:

```bash
docker compose up --build
```

---

## Docker Containers

### Frontend Container
Runs on:

```bash
http://localhost:5173
```

### Backend Container
Runs on:

```bash
http://localhost:5000
```

---

# 🐳 Docker Hub Images

## Frontend Image

```bash
docker pull vimalrajput0195/careerforge-frontend
```

Run:

```bash
docker run -p 5173:5173 vimalrajput0195/careerforge-frontend
```

---

## Backend Image

```bash
docker pull vimalrajput0195/careerforge-backend
```

Run:

```bash
docker run -p 5000:5000 vimalrajput0195/careerforge-backend
```

---

# ✨ Features

- 🤖 AI Resume Builder
- 📄 AI Resume Improver
- 📊 ATS Score Checker
- 📝 AI Cover Letter Generator
- 🔍 AI Job Description Analysis
- 📁 PDF & Image Resume Upload
- 🧠 AI Keyword Suggestions
- 🎨 Multiple Professional Resume Templates
- 👀 Live Resume Preview
- 📥 Resume PDF Download
- 🗂️ Resume Dashboard
- 🐳 Dockerized Full-Stack Application

---

# 🚀 Deployment Ready

- Dockerized Application
- Docker Hub Support
- Portable Containers
- Production Ready Structure

---


Docker Hub:
https://hub.docker.com/u/vimalrajput0195

---