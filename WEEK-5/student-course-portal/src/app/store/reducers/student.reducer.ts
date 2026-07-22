// HO9 — NgRx Reducer for Students using EntityAdapter
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Student } from '../../core/models/student.model';
import * as StudentActions from '../actions/student.actions';

export interface StudentState extends EntityState<Student> {
  loading: boolean;
  error: string | null;
  selectedStudentId: number | null;
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: StudentState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedStudentId: null,
});

export const studentReducer = createReducer(
  initialState,

  on(StudentActions.loadStudents, (state) => ({
    ...state, loading: true, error: null
  })),

  on(StudentActions.loadStudentsSuccess, (state, { students }) =>
    adapter.setAll(students, { ...state, loading: false })
  ),

  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(StudentActions.addStudentSuccess, (state, { student }) =>
    adapter.addOne(student, state)
  ),

  on(StudentActions.updateStudentSuccess, (state, { student }) =>
    adapter.updateOne({ id: student.id, changes: student }, state)
  ),

  on(StudentActions.selectStudent, (state, { id }) => ({
    ...state, selectedStudentId: id
  }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
