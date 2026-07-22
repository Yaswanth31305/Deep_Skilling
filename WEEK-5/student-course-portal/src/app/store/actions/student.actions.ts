// HO9 — NgRx Actions for Student
import { createAction, props } from '@ngrx/store';
import { Student } from '../../core/models/student.model';

// Load students
export const loadStudents = createAction('[Student] Load Students');
export const loadStudentsSuccess = createAction(
  '[Student] Load Students Success',
  props<{ students: Student[] }>()
);
export const loadStudentsFailure = createAction(
  '[Student] Load Students Failure',
  props<{ error: string }>()
);

// Add student
export const addStudent = createAction(
  '[Student] Add Student',
  props<{ student: Omit<Student, 'id'> }>()
);
export const addStudentSuccess = createAction(
  '[Student] Add Student Success',
  props<{ student: Student }>()
);
export const addStudentFailure = createAction(
  '[Student] Add Student Failure',
  props<{ error: string }>()
);

// Update student
export const updateStudent = createAction(
  '[Student] Update Student',
  props<{ id: number; changes: Partial<Student> }>()
);
export const updateStudentSuccess = createAction(
  '[Student] Update Student Success',
  props<{ student: Student }>()
);

// Select current student
export const selectStudent = createAction(
  '[Student] Select Student',
  props<{ id: number }>()
);
