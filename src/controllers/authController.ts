import { Request, Response, NextFunction } from "express";
import {
  createEmployee,
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  loginUser,
} from "../services/user";
import CreateError from "http-errors";
const refresthTokenList: String[] = [];

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createEmployee(req.body);
    const { _id, email, name, role } = user;
    const accessToken = generateAccessToken({ _id, name, email, role });
    const refreshToken = generateRefreshToken({ _id, name, email, role });
    refresthTokenList.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.json({
      message: "User created successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await loginUser(req.body);
    const { _id, name, email, role } = user;
    const accessToken = generateAccessToken({ _id, name, email, role });
    const refreshToken = generateRefreshToken({ _id, name, email, role });
    refresthTokenList.push(refreshToken);
    res.json({
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const index = refresthTokenList.indexOf(refreshToken);
    if (index > -1) {
      refresthTokenList.splice(index, 1);
    }
    res.clearCookie("refreshToken");
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw CreateError(400, "Refresh token is required");
    if (!refresthTokenList.includes(refreshToken)) {
      throw CreateError(401, "Refresh token is invalid");
    }
    const payload = verifyRefreshToken(refreshToken);
    const { _id, name, email, role } = payload as any;
    const accessToken = generateAccessToken({ _id, name, email, role });

    res.json({
      message: "Refresh token successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
