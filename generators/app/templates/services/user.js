import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req) => {
  try {
    let phoneNumber = await User.find({
      phoneNumber: req.validatedBody.phoneNumber,
    });
    if (phoneNumber.length)
      return {
        message: "phone number already registered",
        code: 400,
        data: {},
      };
    let userEmail = await User.find({ email: req.validatedBody.email });
    if (userEmail.length)
      return {
        message: "email already registered",
        code: 400,
        data: {},
      };
    if (!phoneNumber.length && !userEmail.length) {
      const passwordHash = await bcrypt.hash(req.validatedBody.password, 10);
      req.validatedBody.password = passwordHash;
      let newUser = new User({
        ...req.validatedBody,
      });
      const userDetails = await newUser.save();
      return {
        message: "added successfully",
        code: 201,
        data: userDetails,
      };
    }
  } catch (err) {
    return {
      message: "something went wrong",
      code: 500,
      data: {},
    };
  }
};

export const userLogin = async (req) => {
  try {
    let user = await User.findOne({ email: req.validatedBody.email });
    if (!user)
      return {
        message: "No such user found",
        code: 403,
        data: {},
      };
    if (user) {
      let passwordVerify = await bcrypt.compare(
        req.validatedBody.password,
        user.password
      );
      if (passwordVerify) {
        const payload = { email: user.email, userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return {
          token: token,
          userId: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          message: "Login Successfully",
          code: 200,
        };
      } else
        return {
          data: {},
          message: "Wrong Password",
          code: 403,
        };
    }
  } catch (err) {
    return {
      message: "something went wrong",
      code: 500,
      data: {},
    };
  }
};
