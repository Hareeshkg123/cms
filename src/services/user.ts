import bcrypt from "bcrypt";

import CreateError from "http-errors";
import jwt from "jsonwebtoken";
import Employee from "../schema/employeeSchema";
import { EmployeeType } from "./types";

export const createEmployee = async ({
  name,
  email,
  password,
}: EmployeeType) => {
  try {
    const existingEmployee = await Employee.find({
      name,
      email,
    });

    if (existingEmployee.length !== 0) {
      throw CreateError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let employeeDetails = new Employee({
      name,
      email,
      password: hashedPassword,
    });

    const employee = await employeeDetails.save();
    return employee;
  } catch (error) {
    throw error;
  }
};

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await Employee.findOne({
      email,
    });
    if (!user) {
      throw CreateError(401, "Email doesn't exist");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw CreateError(401, "Invalid email or password");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
