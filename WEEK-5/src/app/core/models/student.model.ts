export interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  year: number;
  phone: string;
  enrolledCourses: number[];
  joinedDate: string;
  gpa: number;
  avatar?: string;
}

export interface StudentRegistration {
  name: string;
  email: string;
  department: string;
  year: number;
  phone: string;
  password: string;
  confirmPassword: string;
}
