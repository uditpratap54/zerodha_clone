const jwt = require("jsonwebtoken");

const createSecretToken = (userId) => {
  if (!process.env.TOKEN_KEY) {
    throw new Error("TOKEN_KEY is not defined");
  }

  return jwt.sign(
    { id: userId },
    process.env.TOKEN_KEY,
    { expiresIn: "7d" }
  );
};

module.exports = { createSecretToken };
