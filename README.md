
# 🚀 Moderation Queue Dashboard

![React](https://img.shields.io/badge/React-2025-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-green)
![Redux](https://img.shields.io/badge/Redux_Toolkit-RTK-purple)
![Flatpickr](https://img.shields.io/badge/Flatpickr-Date%20Picker-orange)

A modern moderation dashboard built with **React**, **Tailwind CSS**, **Redux Toolkit**, and **Flatpickr** for advanced date filtering.  
Easily review, filter, and moderate posts with a beautiful UI, batch actions, and keyboard shortcuts.

---

## ✨ Features

✅ Filter posts by status: **Pending / Approved / Rejected**  
✅ Batch select, approve, or reject posts  
✅ Confirmation modal with **undo support**  
✅ Filter by reported reason & date range  
✅ Responsive design, soft gradients, and smooth transitions  
✅ Calendar date picker with `dd-mm-yyyy` format via Flatpickr

---

## 📦 Prerequisites

- **Node.js** (version 16 or higher recommended)  
- **npm** (comes with Node)

---

## 🔧 Installation

```bash
git clone https://github.com/tushar868/moderation-queue.git
cd moderation-queue

npm install
```

---

## 🚀 Run the application locally

```bash
# For Vite:
npm run dev

# Or for create-react-app:
npm start
```

Then open your browser and visit:

```
http://localhost:5173    # Vite (or whatever port is shown)
http://localhost:3000    # create-react-app default
```

---

## 🧪 Run tests (if included)

```bash
npm test
```

(Currently no tests included. If you integrate Jest or React Testing Library, use this command.)

---

## 🌍 Environment Variables

This project does **not require any environment variables by default**.

If you add API integrations, create a `.env` file in your root directory with entries like:

```bash
VITE_API_URL=https://api.example.com
```

_(Use `REACT_APP_` prefix if using create-react-app instead of Vite.)_

---

## 🚀 Tech Stack

- ⚛️ **React** for building UI  
- 🌬️ **Tailwind CSS** for modern styling  
- 🛠️ **Redux Toolkit** for state management  
- 📅 **Flatpickr** for elegant date selection

---

## 📝 License

MIT © [Your Name](https://github.com/yourusername)
