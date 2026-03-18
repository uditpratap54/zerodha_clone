# 📈 Zerodha Clone — Full Stack Stock Broker Web App

A full-stack clone of [Zerodha](https://zerodha.com) — India's largest stock broker platform. Built with the MERN stack (MongoDB, Express, React, Node.js), this project replicates the core experience of Zerodha including a public landing page, JWT-based user authentication, and a protected trading dashboard.

> 🚀 Built for learning purposes and as a strong portfolio/resume project.

---

## 🌐 Live Demo

| App | URL |
|---|---|
| Frontend (Landing Page) | https://zerodha-clone-landingpage.onrender.com |
| Dashboard | https://zerodha-dashboard.onrender.com |
| Backend API | https://zerodha-backend-s9rp.onrender.com |

---

## ✨ Features

### 🏠 Landing Page (Frontend — Port 3000)
- **Home** — Hero section with CTA, platform stats, and product highlights
- **Products** — Kite, Console, Coin, Varsity overview
- **Pricing** — Brokerage pricing breakdown with comparison
- **About** — Company story, team, and awards
- **Support** — Help center with ticket creation form
- **Sign Up** — Create a new account (modern split-panel UI with brand stats)
- **Sign In** — Login with JWT cookie-based authentication + show/hide password

### 📊 Trading Dashboard (Dashboard — Port 3001)
- **Protected Route** — Dashboard is inaccessible without login; auto-redirects to Sign In
- **WatchList** — Watchlist with Buy/Sell/Analytics hover actions and a Doughnut chart
- **Summary** — Portfolio overview with equity margin and P&L
- **Holdings** — Full holdings table with current value, P&L, net & day change + bar chart
- **Positions** — Open positions table with product type and live P&L
- **Orders** — Order history view
- **Funds** — Equity fund details (available margin, used margin, collateral)
- **Buy Window** — Draggable order placement modal triggered from watchlist
- **Real Username** — Logged-in user's name shown in the sidebar menu
- **Logout** — Clears JWT cookie and redirects to Sign In

### 🔒 Backend REST API (Node.js — Port 3002)
- **JWT Authentication** — Signup, Login, Session verification, Logout
- **Cookie-based sessions** — Token stored in HTTP cookie with 7-day expiry
- **MongoDB Atlas** — Cloud database for users, holdings, positions, and orders
- **CORS** — Configured for both local development and production origins
- **Password hashing** — bcryptjs with 12 salt rounds

---

## 🛠️ Tech Stack

### Frontend & Dashboard
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | Client-side routing & protected routes |
| Axios | HTTP client with cookie credentials |
| Chart.js + react-chartjs-2 | Holdings bar chart & watchlist doughnut chart |
| MUI (Material UI v7) | Tooltips and icons in watchlist |
| Custom CSS | Auth page & dashboard styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB Atlas + Mongoose | Cloud database & ODM |
| jsonwebtoken | Auth token generation & verification |
| bcryptjs | Password hashing |
| cookie-parser | Read JWT from request cookies |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |
| nodemon | Dev auto-restart |

---

## 📁 Project Structure

```
zerodha-clone/
│
├── backend/                     # Express REST API
│   ├── controllers/
│   │   └── AuthController.js    # Signup & Login handlers
│   ├── Middlewares/
│   │   └── AuthMiddleWare.js    # JWT verification
│   ├── model/
│   │   ├── UserModel.js         # User model (bcrypt pre-save hook)
│   │   ├── HoldingsModel.js
│   │   ├── PositionsModel.js
│   │   └── OrdersModel.js
│   ├── schemas/
│   │   ├── UserSchema.js
│   │   ├── HoldingsSchema.js
│   │   ├── PositionsSchema.js
│   │   └── OrdersSchema.js
│   ├── Routes/
│   │   └── AuthRoute.js         # POST /signup /login /logout, POST / (verify)
│   ├── utils/
│   │   └── SecretToken.js       # JWT token generator (7d expiry)
│   ├── .env                     # ⚠️ Not committed to git
│   ├── .env.example             # Template for env setup
│   └── index.js                 # App entry — Express setup, DB connect
│
├── frontend/                    # React landing page (Port 3000)
│   ├── src/
│   │   ├── landing_page/
│   │   │   ├── home/            # HomePage, Hero, Stats, Education
│   │   │   ├── about/           # AboutPage, Team, Awards
│   │   │   ├── products/        # ProductsPage with sections
│   │   │   ├── pricing/         # PricingPage, Brokerage
│   │   │   ├── support/         # SupportPage, CreateTicket
│   │   │   ├── signup/
│   │   │   │   ├── Signup.jsx   # Create account (split-panel UI)
│   │   │   │   ├── signIn.jsx   # Login page (split-panel UI)
│   │   │   │   └── auth.css     # Shared auth page styles
│   │   │   ├── Navbar.js        # Hidden on /signup and /signin
│   │   │   ├── Footer.js        # Hidden on /signup and /signin
│   │   │   └── NotFound.js
│   │   ├── api.js               # Axios instance (baseURL from .env)
│   │   └── index.js             # React Router setup
│   ├── .env                     # ⚠️ Not committed to git
│   └── .env.example
│
└── dashboard/                   # React trading dashboard (Port 3001)
    ├── src/
    │   ├── components/
    │   │   ├── ProtectedRoute.js    # Blocks access if not authenticated
    │   │   ├── Home.js              # TopBar + Dashboard layout
    │   │   ├── TopBar.js            # NIFTY/SENSEX indices + Menu
    │   │   ├── Menu.js              # Nav links, real username, logout
    │   │   ├── Dashboard.js         # Route container for all views
    │   │   ├── WatchList.js         # Stock watchlist with actions
    │   │   ├── BuyActionWindow.js   # Order placement modal
    │   │   ├── GeneralContext.js    # React context for buy window
    │   │   ├── Summary.js           # Portfolio summary
    │   │   ├── Holdings.js          # Holdings table + bar chart
    │   │   ├── Positions.js         # Positions table
    │   │   ├── Orders.js            # Orders view
    │   │   ├── Funds.js             # Fund details
    │   │   ├── DoughnoutChart.js    # Doughnut chart component
    │   │   └── VerticalGraph.js     # Bar chart component
    │   ├── data/
    │   │   └── data.js              # Static watchlist, holdings, positions
    │   ├── api.js                   # Axios instance (baseURL from .env)
    │   └── index.js                 # App entry with ProtectedRoute wrapper
    ├── .env                         # ⚠️ Not committed to git
    └── .env.example
```

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- Git

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/zerodha-clone.git
cd zerodha-clone
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<AppName>
TOKEN_KEY=your_super_secret_jwt_key_here
PORT=3002
```

> **MongoDB Atlas setup:**
> 1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
> 2. Go to **Network Access** → Add your IP (or `0.0.0.0/0` for dev)
> 3. Go to **Database Access** → Create a user with read/write permissions
> 4. Get your connection string from **Connect → Drivers**

Start the backend:

```bash
npm run dev     # development with nodemon
npm start       # production
```

Backend runs on **http://localhost:3002**

---

### 3. Setup Frontend (Landing Page)

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:3002
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

Start the frontend:

```bash
npm start
```

Frontend runs on **http://localhost:3000**

---

### 4. Setup Dashboard

```bash
cd dashboard
npm install
cp .env.example .env
```

Edit `dashboard/.env`:

```env
PORT=3001
REACT_APP_API_BASE_URL=http://localhost:3002
REACT_APP_FRONTEND_URL=http://localhost:3000
```

Start the dashboard:

```bash
npm start
```

Dashboard runs on **http://localhost:3001**

---

### 5. Run All Three (Quick Reference)

Open **3 separate terminals**:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend Landing Page
cd frontend && npm start

# Terminal 3 — Dashboard
cd dashboard && npm start
```

---

## 🔐 Authentication Flow

```
User visits  localhost:3000          → Public landing page
             localhost:3000/signup   → Fill form → Account created → redirect to /signin
             localhost:3000/signin   → Login → JWT cookie set → redirect to localhost:3001
             localhost:3001          → ProtectedRoute checks JWT via POST /
                                       ✅ Valid token  → Show dashboard
                                       ❌ Invalid/no token → Redirect to /signin
             Click Logout            → POST /logout → Cookie cleared → redirect to /signin
```

---

## 📡 API Reference

Base URL: `http://localhost:3002`

### Auth Endpoints

| Method | Endpoint | Description | Body |
|---|---|---|---|
| POST | `/signup` | Register a new user | `{ email, username, password }` |
| POST | `/login` | Login, sets JWT cookie | `{ email, password }` |
| POST | `/` | Verify active JWT session | Cookie: `token` |
| POST | `/logout` | Clear JWT cookie | — |

### Data Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/allHoldings` | Fetch all holdings from MongoDB |
| GET | `/allPositions` | Fetch all positions from MongoDB |
| POST | `/newOrder` | Save a new order to MongoDB |

### Sample Responses

**POST /login — Success:**
```json
{ "message": "User logged in successfully", "success": true }
```

**POST / — Valid session:**
```json
{ "status": true, "user": "john_doe" }
```

**POST /newOrder — Body:**
```json
{ "name": "INFY", "qty": 2, "price": 1555.45, "mode": "BUY" }
```

---

## 🌍 Deployment on Render

Each of the three apps is deployed as a **separate Render service**.

### Backend — Web Service

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node index.js` |

Environment variables to add in Render dashboard:
```
MONGO_URL=<your MongoDB Atlas URI>
TOKEN_KEY=<your JWT secret>
PORT=10000
```

> After deploying, update the `origin` array in `backend/index.js` with your actual Render frontend and dashboard URLs.

### Frontend — Static Site

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `frontend/build` |

Environment variables:
```
REACT_APP_API_BASE_URL=https://your-backend.onrender.com
REACT_APP_DASHBOARD_URL=https://your-dashboard.onrender.com
```

### Dashboard — Static Site

| Setting | Value |
|---|---|
| Root Directory | `dashboard` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dashboard/build` |

Environment variables:
```
REACT_APP_API_BASE_URL=https://your-backend.onrender.com
REACT_APP_FRONTEND_URL=https://your-frontend.onrender.com
```

---

## 🔒 Security

- Passwords hashed with **bcryptjs** (12 salt rounds) — never stored in plain text
- Auth tokens are **JWT** signed with a secret key, 7-day expiry
- Dashboard is **fully protected** — server-side JWT verification on every load
- `.env` files are gitignored — secrets are never committed
- CORS is restricted to known trusted origins only

---

## ⚠️ Known Limitations

- Holdings and Positions are **static seed data** — not real-time market prices
- NIFTY 50 / SENSEX values in the TopBar are hardcoded (not live feed)
- No real payment integration for the Funds page
- Free-tier MongoDB Atlas clusters **pause after 60 days of inactivity** — resume from Atlas dashboard if backend fails to connect

---

## 👨‍💻 Author

**Manvendra**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

> ⚠️ **Disclaimer:** This is a clone built for educational and portfolio purposes only. It is not affiliated with, endorsed by, or connected to Zerodha Broking Ltd. in any way.

---

## 🙏 Acknowledgements

- [Zerodha](https://zerodha.com) — UI/UX inspiration
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — free cloud database
- [Render](https://render.com) — free deployment platform
- [Chart.js](https://www.chartjs.org/) — charts in the dashboard
- [Material UI](https://mui.com/) — icons and tooltips in the watchlist
