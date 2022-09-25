import { CourseType } from "./types";
import Course from "../schema/courseSchema";
import CreateError from "http-errors";
import { MongooseError } from "mongoose";
import _ from "lodash";
export const createCourse = async ({
  category,
  description,
  duration,
  title,
  topics,
  videoUrl,
}: CourseType) => {
  try {
    const existingCourse = await Course.find({
      title,
    });

    if (existingCourse.length !== 0) {
      throw CreateError(409, "Course already exists");
    }

    const courseDetails = new Course({
      category,
      description,
      duration,
      title,
      topics,
      videoUrl,
      isApproved: false,
    });

    const course = await courseDetails.save();
    return course;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async ({
  category,
  description,
  duration,
  title,
  newTitle,
  topics,
  videoUrl,
}: CourseType & { newTitle: string }) => {
  try {
    const existingCourse = await Course.find({
      title,
    });

    if (existingCourse.length === 0) {
      throw CreateError(409, "Course Doesnt exist");
    }

    const course = await Course.updateOne(
      {
        title,
      },
      {
        $set: {
          title: newTitle,
          category: category,
          description: description,
          duration: duration,
          topics: topics,
          videoUrl: videoUrl,
        },
      }
    );
    return course;
  } catch (error) {
    throw error;
  }
};

export const deleteCourseItem = async ({ title }: CourseType) => {
  try {
    const existingCourse = await Course.find({
      title,
    });

    if (existingCourse.length === 0) {
      throw CreateError(409, "Course doesnt exists");
    }

    const course = await Course.deleteOne({
      title,
    });
    return course;
  } catch (error) {
    throw error;
  }
};

export const approveCourseItem = async ({ title }: CourseType) => {
  try {
    const course = await Course.updateOne(
      {
        title,
      },
      {
        $set: {
          isApproved: true,
        },
      }
    );
    return course;
  } catch (error: unknown) {
    const err = error as MongooseError;
    throw error;
  }
};

export const getAllCourse = async () => {
  try {
    const courses = await Course.find({
      isApproved: true,
    });

    const groupedCourses = _.chain(courses)
      .groupBy("category")
      .map((value: any, key: any) => ({ category: key, courses: value }))
      .value();

    return groupedCourses;
  } catch (error: unknown) {
    const err = error as MongooseError;
    throw error;
  }
};
