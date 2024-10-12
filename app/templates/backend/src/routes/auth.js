import express from "express";
import {
  newUserValidator,
  loginValidator,
} from "../validators/joi.validator.js";
const router = express.Router();
import { userRegister, userLogin } from "../services/user.js";
router.post("/login", loginValidator, userLogin);

router.post("/register", newUserValidator, userRegister);

export default router;
