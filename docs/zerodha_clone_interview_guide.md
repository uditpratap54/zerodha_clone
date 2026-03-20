ZERODHA CLONE INTERVIEW GUIDE

Ye PDF Zerodha Clone ke liye Hinglish interview notes hai. Isme MERN architecture, JWT auth, dashboard flow aur important code explanation diya gaya hai.

1. One-line Introduction

Zerodha Clone ek MERN-based full-stack stock broker style application hai jisme public landing page, login/signup aur protected portfolio dashboard implement kiya gaya hai.

2. Short Interview Intro

Ye project maine portfolio-strength full-stack application ke roop me build kiya. Isme React landing page, separate dashboard app, Express backend, MongoDB data storage aur JWT cookie-based authentication use ki gayi hai. User holdings, positions aur orders related dashboard features dekh sakta hai.

3. Tech Stack

- React
- React Router
- Axios
- Chart.js
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

4. Main Features

- Signup and login
- Password hashing
- Cookie-based JWT auth
- Protected dashboard route
- Holdings and positions data
- Orders create flow
- Watchlist and buy modal
- Dashboard username

5. Architecture

Project 3 parts me split hai:
- `frontend` public pages
- `dashboard` private app UI
- `backend` REST APIs

6. Important Code with Line Meaning

Snippet A: CORS and credentials

```js
const allowedOrigins = [ // Allowed frontend/dashboard domains ki list
  "http://localhost:3000", // Local landing page
  "http://localhost:3001", // Local dashboard
  "https://zerodha-clone-landingpage.onrender.com", // Hosted frontend
  "https://zerodha-dashboard.onrender.com", // Hosted dashboard
];

app.use(
  cors({
    origin: allowedOrigins, // Sirf trusted origins allowed hain
    credentials: true, // Cookie-based auth requests allow hongi
  })
);
```

Snippet B: signup

```js
const normalizedEmail = email?.trim().toLowerCase(); // Email normalization
const normalizedUsername = username?.trim(); // Username cleanup

const existingUser = await UserModel.findOne({ email: normalizedEmail }); // Duplicate check
if (existingUser) {
  return res.status(409).json({ message: "User already exists", success: false }); // Conflict response
}

const user = await UserModel.create({ // User creation
  email: normalizedEmail,
  password,
  username: normalizedUsername,
  createdAt,
});
```

Snippet C: password hashing

```js
UserSchema.pre("save", async function () { // Save se pehle hook chalega
  if (!this.isModified("password")) { // Agar password change nahi hua
    return; // To rehash nahi hoga
  }

  this.password = await bcrypt.hash(this.password, 12); // Secure hash create hua
});
```

Snippet D: session verification route use in dashboard

```jsx
useEffect(() => {
  API.post("/") // Backend verify endpoint hit hota hai
    .then((res) => {
      if (res.data.status) { // Session valid
        localStorage.setItem("username", res.data.user); // Username save hua
        setStatus("auth"); // Dashboard allow hoga
      } else {
        setStatus("unauth"); // Redirect condition
      }
    })
    .catch(() => {
      setStatus("unauth"); // Error ko unauthorized treat kiya
    });
}, []);
```

Snippet E: axios instance

```js
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3002", // Backend URL central place par
  withCredentials: true, // Cookie requests allow
});
```

Snippet F: order creation

```jsx
API.post("/newOrder", {
  name: uid, // Stock symbol/name
  qty: stockQuantity, // Quantity input
  price: stockPrice, // Price input
  mode: "BUY", // Order mode
})
  .then(() => {
    generalContext.closeBuyWindow(); // Success par modal close
  })
  .catch(console.error); // Failure log
```

7. Interview Questions

Q. JWT cookie auth kyun?
Answer:
Cross-app login flow aur stateless verification ke liye ye good fit tha. Browser cookie automatically request ke sath send hoti hai.

Q. Separate dashboard kyun?
Answer:
Public marketing site aur private product dashboard ko separate rakhna real-world product structure ko better represent karta hai.

Q. Context kyun use kiya?
Answer:
Buy modal state ko watchlist se trigger karne ke liye context ne prop drilling avoid ki.

8. HR Style Answer

Ye project maine isliye banaya kyunki mujhe ek strong portfolio project chahiye tha jisme frontend, backend, auth aur dashboard sab practical form me ho.

9. Improvements

- Protected APIs par auth middleware
- Better secure cookies
- Better validation
- Dynamic watchlist
- Testing
