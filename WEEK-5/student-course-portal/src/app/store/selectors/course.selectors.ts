// HO9 — NgRx Selectors for Courses
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, selectAll } from '../reducers/course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(selectCourseState, selectAll);
export const selectCoursesLoading = createSelector(selectCourseState, s => s.loading);
export const selectCoursesError = createSelector(selectCourseState, s => s.error);
export const selectSearchTerm = createSelector(selectCourseState, s => s.searchTerm);
export const selectCategoryFilter = createSelector(selectCourseState, s => s.categoryFilter);

export const selectFilteredCourses = createSelector(
  selectAllCourses,
  selectSearchTerm,
  selectCategoryFilter,
  (courses, searchTerm, category) => {
    return courses.filter(course => {
      const matchesSearch = !searchTerm ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || course.category === category;
      return matchesSearch && matchesCategory;
    });
  }
);

export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.enrolled)
);

export const selectTotalCourses = createSelector(selectAllCourses, c => c.length);
export const selectEnrolledCount = createSelector(selectEnrolledCourses, c => c.length);
