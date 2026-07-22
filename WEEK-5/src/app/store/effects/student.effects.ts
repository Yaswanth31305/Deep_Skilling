// HO9 — NgRx Effects for Students (side effects — HTTP calls)
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { StudentService } from '../../core/services/student.service';
import * as StudentActions from '../actions/student.actions';

@Injectable()
export class StudentEffects {
  private actions$ = inject(Actions);
  private studentService = inject(StudentService);

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      switchMap(() =>
        this.studentService.getStudents().pipe(
          map(students => StudentActions.loadStudentsSuccess({ students })),
          catchError(error => of(StudentActions.loadStudentsFailure({ error: error.message })))
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      mergeMap(({ student }) =>
        this.studentService.addStudent(student).pipe(
          map(newStudent => StudentActions.addStudentSuccess({ student: newStudent })),
          catchError(error => of(StudentActions.addStudentFailure({ error: error.message })))
        )
      )
    )
  );
}
