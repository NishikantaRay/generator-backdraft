import express from "express";
const router = express.Router();
import {
  newUserValidator,
  loginValidator,
} from "../validators/joi.validator.js";
import { userRegister, userLogin } from "../controller/user.js";

router.post("/register", newUserValidator, userRegister);
router.post("/login", loginValidator, userLogin);

export default router;
