# 🚀 CareerForge Pro

An AI-powered Resume Builder SaaS built with React, Vite, and Tailwind CSS. CareerForge Pro helps users create professional resumes, optimize for ATS systems, generate cover letters, and improve existing resumes using AI.

---

## 📂 Project Structure

CareerForge-Pro/
│
├── frontend/        # React Frontend (Vite + Tailwind CSS)
├── backend/         # Backend (Coming Soon)

---

## 🛠️ Tech Stack

- React.js
- Vite
- Tailwind CSS
- JavaScript
- Groq AI API (llama3-8b-8192)
- Context API (State Management)

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

# Clone the repository
git clone https://github.com/vimalrajput05/CareerForge-Pro.git

# Go to project folder
cd CareerForge-Pro

# Open in VS Code
code .

# Go to frontend
cd frontend

# Install dependencies
npm install

# Run project
npm run dev

---

## 🔑 Groq API Key Setup (Required for AI Features)

This project uses Groq AI API which is completely FREE — no credit card required.

### Step 1 — Get your free Groq API Key:
1. Open https://console.groq.com in your browser
2. Click "Sign Up" and login with your Google account
3. After login, click "API Keys" in the left sidebar
4. Click "Create API Key" button
5. Give it any name like careerforge-key and click Submit
6. Copy the key shown — it starts with gsk_
7. Save it safely — it is shown only once

### Step 2 — Create .env file in frontend folder:
1. Open the project in VS Code
2. Go to the frontend/ folder
3. Create a new file named exactly: .env
4. Add this single line inside the file:

VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxx

5. Replace gsk_xxxxxxxxxxxxxxxx with your actual copied key
6. Save the file

### Step 3 — Run the project:
Now run npm run dev and all AI features will work automatically.

### ⚠️ Important Notes:
- The .env file is already in .gitignore — it will NOT be pushed to GitHub
- Never share your API key publicly
- Without this key, AI features will show an error alert

---

## ✨ Features

- 🧠 AI Resume Builder with Live Preview
- 🎨 4 Professional Resume Templates
- ✨ AI Improve button for Skills and Experience sections
- 📄 Improve Existing Resume using AI (paste your old resume)
- 📊 ATS Score Checker with How to Improve suggestions
- 📁 PDF and Image Resume Upload with text extraction
- 🔍 JD Analysis — AI powered keyword extraction
- 📝 AI Cover Letter Generator
- 📂 Dashboard to manage all resumes and cover letters
- 📥 Download Resume as PDF

---

