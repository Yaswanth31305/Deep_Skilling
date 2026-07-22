import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState, selectAll, selectEntities } from '../reducers/student.reducer';

export const selectStudentState = createFeatureSelector<StudentState>('students');

export const selectAllStudents = createSelector(selectStudentState, selectAll);
export const selectStudentEntities = createSelector(selectStudentState, selectEntities);
export const selectStudentsLoading = createSelector(selectStudentState, s => s.loading);
export const selectStudentsError = createSelector(selectStudentState, s => s.error);
export const selectSelectedStudentId = createSelector(selectStudentState, s => s.selectedStudentId);

export const selectSelectedStudent = createSelector(
  selectStudentEntities,
  selectSelectedStudentId,
  (entities, id) => (id !== null ? entities[id] : null)
);

export const selectTotalStudents = createSelector(selectAllStudents, s => s.length);
