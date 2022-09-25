import express from "express";
import {
  addCourse,
  updateCourseData,
  deleteCourse,
  approveCourse,
  ViewCouse,
} from "../controllers/courseController";
import { authenticateToken } from "../middlewares/authenticateToken";
import { checkRole } from "../middlewares/checkRole";

const router = express.Router();

router.post(
  "/add",
  authenticateToken,
  (req, res, next) => {
    checkRole(req, res, next, "admin");
  },
  addCourse
);

router.put(
  "/update",
  authenticateToken,
  (req, res, next) => {
    checkRole(req, res, next, "admin");
  },
  updateCourseData
);

router.delete(
  "/delete",
  authenticateToken,
  (req, res, next) => {
    checkRole(req, res, next, "admin");
  },
  deleteCourse
);

router.put(
  "/approve",
  authenticateToken,
  (req, res, next) => {
    checkRole(req, res, next, "superadmin");
  },
  approveCourse
);

router.get("/all", authenticateToken, ViewCouse);

export default router;
