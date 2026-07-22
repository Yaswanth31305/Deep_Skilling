import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf, NgClass, NgStyle, DatePipe, UpperCasePipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Student } from '../../core/models/student.model';
import { Course } from '../../core/models/course.model';
import { AuthService } from '../../core/services/auth.service';
import { AppState } from '../../store/reducers/app.state';
import { loadStudents } from '../../store/actions/student.actions';
import { loadCourses } from '../../store/actions/course.actions';
import { selectAllStudents, selectStudentsLoading } from '../../store/selectors/student.selectors';
import { selectEnrolledCourses, selectTotalCourses, selectEnrolledCount } from '../../store/selectors/course.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle, RouterLink, FormsModule, DatePipe, UpperCasePipe, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private store = inject(Store<AppState>);
  authService = inject(AuthService);

  students$: Observable<Student[]> = this.store.select(selectAllStudents);
  loading$: Observable<boolean> = this.store.select(selectStudentsLoading);
  enrolledCourses$: Observable<Course[]> = this.store.select(selectEnrolledCourses);
  totalCourses$: Observable<number> = this.store.select(selectTotalCourses);
  enrolledCount$: Observable<number> = this.store.select(selectEnrolledCount);

  searchTerm = signal('');
  currentDate = new Date();
  greeting = signal('');

  headerTitle = 'Student Course Portal';

  onNavChange(route: string): void {
    console.log('Navigated to:', route);
  }

  ngOnInit(): void {

    this.store.dispatch(loadStudents());
    this.store.dispatch(loadCourses());
    this.setGreeting();
  }

  private setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting.set('Good Morning');
    else if (hour < 17) this.greeting.set('Good Afternoon');
    else this.greeting.set('Good Evening');
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  getYearClass(year: number): string {
    return `year-${year}`;
  }

  getGpaColor(gpa: number): string {
    if (gpa >= 9) return 'gpa-excellent';
    if (gpa >= 7) return 'gpa-good';
    return 'gpa-average';
  }
}
