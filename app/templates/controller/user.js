import * as UserService from "../services/user.js";

export const userRegister = async (req, res, next) => {
  try {
    const data = await UserService.userRegister(req);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req);
    res.status(data.code).json({
      code: data.code,
      token: data.token,
      userId: data.userId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
    });
  } catch (error) {
    next(error);
  }
};
