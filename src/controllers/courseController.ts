import { Request, Response, NextFunction } from "express";
import {
  createCourse,
  updateCourse,
  deleteCourseItem,
  approveCourseItem,
  getAllCourse,
} from "../services/course";

export const addCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await createCourse(req.body);
    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourseData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCourse = await updateCourse(req.body);
    res.json({
      message: "Course updated successfully",
      newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCourse = await deleteCourseItem(req.body);
    res.json({
      message: "Course deleted successfully",
      newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const approveCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCourse = await approveCourseItem(req.body);
    res.json({
      message: "Course approved",
      newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const ViewCouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await getAllCourse();
    res.json({
      message: "success",
      course,
    });
  } catch (error) {
    next(error);
  }
};
