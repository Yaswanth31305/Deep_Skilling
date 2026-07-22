// HO9 — NgRx Effects for Courses
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { CourseService } from '../../core/services/course.service';
import * as CourseActions from '../actions/course.actions';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );

  enrollCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.enrollCourse),
      mergeMap(({ courseId }) =>
        this.courseService.enrollCourse(courseId).pipe(
          map(() => CourseActions.enrollCourseSuccess({ courseId })),
          catchError(() => of(CourseActions.enrollCourseSuccess({ courseId })))
        )
      )
    )
  );

  unenrollCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.unenrollCourse),
      mergeMap(({ courseId }) =>
        this.courseService.unenrollCourse(courseId).pipe(
          map(() => CourseActions.unenrollCourseSuccess({ courseId })),
          catchError(() => of(CourseActions.unenrollCourseSuccess({ courseId })))
        )
      )
    )
  );
}
