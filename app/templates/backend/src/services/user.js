import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
export const userRegister = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.validatedBody.email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
        code: 400,
        data: {},
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(req.validatedBody.password, 10);
    req.validatedBody.password = passwordHash;

    // Create a new user
    const newUser = new User({ ...req.validatedBody });
    const userDetails = await newUser.save();

    // Return a success response
    return res.status(201).json({
      message: "User added successfully",
      code: 201,
      data: {
        userId: userDetails._id,
        email: userDetails.email,
        name: userDetails.name,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      error: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    // Find user by email
    const userData = await User.findOne({
      email: req.validatedBody.email,
    }).select("+password"); // Explicitly select the password if it's not selected by default
    if (!userData) {
      return res.status(404).json({
        data: {},
        message: "No such user found",
        code: 404,
      });
    }

    // Verify password
    const passwordVerify = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!passwordVerify) {
      return res.status(401).json({
        data: {},
        message: "Wrong Password",
        code: 401,
      });
    }

    // Generate token
    const payload = { userId: userData._id, email: userData.email }; // Only include necessary information in the token
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "2d",
    });

    // Respond with the token and user info
    return res.status(200).json({
      token,
      userId: userData._id,
      email: userData.email,
      message: "Login success",
      code: 200,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      error: error.message,
    });
  }
};
