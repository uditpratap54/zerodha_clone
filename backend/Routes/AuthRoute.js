const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleWare");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: false });
  res.status(200).json({ message: "Logged out successfully", success: true });
});

module.exports = router;
