import { Request, Response, NextFunction } from "express";
import CreateError from "http-errors";
import jwt from "jsonwebtoken";
import { EmployeeType } from "../services/types";

export const checkRole = (
  req: Request,
  res: Response,
  next: NextFunction,
  role: "admin" | "superadmin"
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw CreateError(401, "No authorization header");
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as EmployeeType;

    if (user.role === "employee") {
      throw new Error();
    }

    if (role === "admin") {
      if (user.role === "admin" || user.role === "superadmin") {
        next();
      }
    }

    if (role === "superadmin" && user.role === "superadmin") {
      next();
    }

    ///@ts-ignore
    req.user = user;
  } catch (error) {
    throw CreateError(400, "Not Authorized!");
  }
};
