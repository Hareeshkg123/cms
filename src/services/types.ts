/**
 * types
 */

export interface EmployeeType {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface CourseType {
  title: string;
  description: string;
  videoUrl: string;
  topics: Array<string>;
  duration: string;
  category: string;
}
