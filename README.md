# 🛍️ Vibe Commerce - E-Commerce Shopping Cart

Full-stack e-commerce shopping cart application built with React, Node.js, Express, and MongoDB.

<img width="1920" height="1080" alt="Screenshot (434)" src="https://github.com/user-attachments/assets/97d20032-9d84-4194-a638-64f349790087" />
<img width="1920" height="1080" alt="Screenshot (435)" src="https://github.com/user-attachments/assets/92698736-7b04-46fd-b7e8-770bf53bab6c" />
<img width="1920" height="1080" alt="Screenshot (436)" src="https://github.com/user-attachments/assets/80ac5aa3-2e89-4bb2-92b1-0559cf55a63e" />
<img width="1920" height="1080" alt="Screenshot (437)" src="https://github.com/user-attachments/assets/3e1d2b25-04a3-42de-b03e-9a0caf4e6b78" />
<img width="1920" height="1080" alt="Screenshot (438)" src="https://github.com/user-attachments/assets/607a3fa3-006c-405f-bff5-40c096831161" />



---

## ✨ Features

- Product browsing with real-time cart updates
- Add/remove items, update quantities
- Checkout with form validation
- Order confirmation with receipt
- Responsive design for all devices

---

## 🛠️ Tech Stack

**Frontend:** React, Context API, Axios, CSS3  
**Backend:** Node.js, Express.js, Mongoose  
**Database:** MongoDB

---

## 📁 Project Structure

```
ecom-cart-app/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Error handling
│   ├── data/            # Mock data
│   ├── .env.example     # Environment template
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Global state
│   │   ├── services/    # API calls
│   │   └── App.jsx      # Main component
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/vibe-commerce-cart.git
cd vibe-commerce-cart
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI

# Seed database
npm run seed

# Start server
npm run dev
```
Backend runs on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start React app
npm start
```
Frontend runs on: `http://localhost:3000`

---

## ⚙️ Environment Variables

### backend/.env
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibe-commerce
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products/seed` | Seed database |
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove item |
| POST | `/api/checkout` | Process order |

---

## 🐛 Troubleshooting

**MongoDB Connection Error:**
```bash
# Start MongoDB service
brew services start mongodb-community  # macOS
sudo systemctl start mongod             # Linux
```

**Port Already in Use:**
```bash
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

**Module Not Found:**
```bash
rm -rf node_modules package-lock.json
npm install
```


⭐ Star this repo if you found it helpful!
