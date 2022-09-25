/**
 * Schema for course
 */
import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  topics: {
    type: [String],
  },
  duration: {
    type: String,
  },
  category: {
    type: String,
  },
  isApproved: {
    type: Boolean,
  },
});

export default model("Course", courseSchema);
