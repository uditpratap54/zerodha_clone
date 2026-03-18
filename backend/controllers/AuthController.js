// const User = require("../models/UserModel");


const { UserModel } = require("../model/UserModel.js");
const { createSecretToken } = require("../utils/SecretToken.js");
const bcrypt = require("bcryptjs");

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: false,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  };
};

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Email, username, and password are required",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    const user = await UserModel.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, getCookieOptions());
    return res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to create account right now",
      success: false,
    });
  }
};


module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.status(400).json({message:'All fields are required', success: false})
    }
    const user = await UserModel.findOne({ email });
    if(!user){
      return res.status(401).json({message:'Incorrect password or email', success: false }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(401).json({message:'Incorrect password or email', success: false }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, getCookieOptions());
     return res.status(200).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to sign in right now",
      success: false,
    });
  }
};
