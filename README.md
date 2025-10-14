# 📚 BookSwap Marketplace

A full-stack **MERN** web application that allows users to **exchange used books** easily.  
Built using **MongoDB, Express.js, React, Node.js**, and styled with **Tailwind CSS**.  
Includes **JWT authentication**, book management, and request handling features.

### Deployed link: https://bookswap-market-place-frontend.onrender.com/

## 🚀 Features

- 🔐 User Authentication (Signup / Login) using **JWT**
- 📘 Post, view, and manage books with details (title, author, condition, image)
- 🔄 Send and manage **book exchange requests**
- 📬 Request statuses: `pending`, `accepted`, `declined`
- 👤 Personalized dashboard — shows your own books & requests
- 🧭 Dynamic Navbar — shows logged-in username instead of Login/Signup buttons
- 🎨 Beautiful and responsive UI built with **Tailwind CSS**

## 🏗️ Tech Stack

### **Frontend**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Context API for Auth state management

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- CORS
- Multer (for book image upload)

### Steps to start the project
1. Clone the repo:
```bash
git clone https://github.com/aaryarastogi/BookSwap-Market-Place
cd BookSwap-Market-Place
```
2. Install dependencies
```bash
npm install
```
3. Run the project
```bash
npm run dev
```