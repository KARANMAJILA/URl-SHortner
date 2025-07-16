# 📎 URL Shortener - Full Stack Project

A full-stack URL Shortener app built using **React**, **Node.js**, and **MongoDB**. Users can input a long URL and receive a shortened version. Each shortened URL tracks stats like click count and creation date.

---

## 🚀 Tech Stack

### Frontend:

* React (Vite)
* Axios
* Tailwind CSS
* React Router DOM
* React Toastify

### Backend:

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* NanoID (for short code generation)
* Dotenv & CORS

---

## 🔧 Features

### 🔗 URL Shortener

* Input a long URL and generate a short code
* Redirect to the original URL when the short link is visited
* Copy and open short links directly

### 📊 Stats Page

* See number of clicks, creation date, and last clicked

### 🖥 Dashboard

* View all shortened URLs in a table
* Clicks, created date, and actions

### 🎯 Graceful UX

* Loading spinners, error handling, toasts
* Mobile-responsive layout

---

## 🛠 How to Run Locally

### ✅ Prerequisites

* Node.js installed
* MongoDB Atlas account (or local MongoDB)
* Git installed

---

### 🔌 Clone the Repository

```bash
git clone https://github.com/KARANMAJILA/URL-SHortner.git
cd url-shortener
```

---

### ⚙️ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

Then start the server:

```bash
npm run dev
```

---

### 🎨 Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client/`:

```env
VITE_API_URL=http://localhost:5000
```

Then start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`
Backend runs at: `http://localhost:5000`

---

## 📂 Folder Structure

```
/url-shortener
├── client/        # React Frontend
│   └── src/
│       └── components/
├── server/        # Node + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
```

---

