// HO9 — NgRx Reducer for Courses
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from '../../core/models/course.model';
import * as CourseActions from '../actions/course.actions';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  error: string | null;
  searchTerm: string;
  categoryFilter: string;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CourseState = adapter.getInitialState({
  loading: false,
  error: null,
  searchTerm: '',
  categoryFilter: 'All',
});

export const courseReducer = createReducer(
  initialState,

  on(CourseActions.loadCourses, (state) => ({
    ...state, loading: true, error: null
  })),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) =>
    adapter.setAll(courses, { ...state, loading: false })
  ),

  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(CourseActions.enrollCourseSuccess, (state, { courseId }) =>
    adapter.updateOne({ id: courseId, changes: { enrolled: true } }, state)
  ),

  on(CourseActions.unenrollCourseSuccess, (state, { courseId }) =>
    adapter.updateOne({ id: courseId, changes: { enrolled: false } }, state)
  ),

  on(CourseActions.filterCourses, (state, { searchTerm, category }) => ({
    ...state, searchTerm, categoryFilter: category
  }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
