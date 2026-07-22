import { StudentState } from './student.reducer';
import { CourseState } from './course.reducer';

export interface AppState {
  students: StudentState;
  courses: CourseState;
}
