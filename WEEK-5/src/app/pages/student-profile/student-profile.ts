import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf, NgClass, NgStyle, DatePipe, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Student } from '../../core/models/student.model';
import { Course } from '../../core/models/course.model';
import { AuthService } from '../../core/services/auth.service';
import { AppState } from '../../store/reducers/app.state';
import { loadStudents } from '../../store/actions/student.actions';
import { loadCourses } from '../../store/actions/course.actions';
import { selectAllStudents } from '../../store/selectors/student.selectors';
import { selectEnrolledCourses } from '../../store/selectors/course.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle, DatePipe, AsyncPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {

  authService = inject(AuthService);
  private store = inject(Store<AppState>);

  enrolledCourses$: Observable<Course[]> = this.store.select(selectEnrolledCourses);
  allStudents$: Observable<Student[]> = this.store.select(selectAllStudents);

  activeTab = signal<'overview' | 'courses' | 'classmates'>('overview');
  editMode = signal(false);

  editName = signal('');

  ngOnInit(): void {
    this.store.dispatch(loadStudents());
    this.store.dispatch(loadCourses());

    const user = this.authService.getCurrentStudent();
    if (user) this.editName.set(user.name);
  }

  setTab(tab: 'overview' | 'courses' | 'classmates'): void {
    this.activeTab.set(tab);
  }

  toggleEdit(): void {
    this.editMode.update(v => !v);
  }

  saveProfile(): void {
    const current = this.authService.getCurrentStudent();
    if (current) {
      this.authService.login({ ...current, name: this.editName() });
    }
    this.editMode.set(false);
  }

  getGpaGrade(gpa: number): string {
    if (gpa >= 9) return 'A+';
    if (gpa >= 8) return 'A';
    if (gpa >= 7) return 'B+';
    return 'B';
  }

  getProgressWidth(gpa: number): string {
    return `${(gpa / 10) * 100}%`;
  }
}
