// HO2: Course data model
export interface Course {
  id: number;
  title: string;
  instructor: string;
  credits: number;
  category: string;
  description: string;
  duration: string;
  enrolled: boolean;
  rating: number;
  students: number;
  startDate: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CourseRegistration {
  studentId: number;
  coursePreferences: CoursePreference[];
  startDate: string;
  reason: string;
}

export interface CoursePreference {
  courseId: number;
  priority: number;
}
