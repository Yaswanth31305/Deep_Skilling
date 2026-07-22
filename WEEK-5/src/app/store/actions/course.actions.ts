import { createAction, props } from '@ngrx/store';
import { Course } from '../../core/models/course.model';

export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

export const enrollCourse = createAction(
  '[Course] Enroll Course',
  props<{ courseId: number }>()
);
export const enrollCourseSuccess = createAction(
  '[Course] Enroll Course Success',
  props<{ courseId: number }>()
);

export const unenrollCourse = createAction(
  '[Course] Unenroll Course',
  props<{ courseId: number }>()
);
export const unenrollCourseSuccess = createAction(
  '[Course] Unenroll Course Success',
  props<{ courseId: number }>()
);

export const filterCourses = createAction(
  '[Course] Filter Courses',
  props<{ searchTerm: string; category: string }>()
);
