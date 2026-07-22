// HO3+HO6+HO9 — Course List with Directives, Pipes, Services & NgRx
import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf, NgClass, NgStyle, UpperCasePipe, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Course } from '../../core/models/course.model';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { AppState } from '../../store/reducers/app.state';
import { loadCourses, enrollCourse, unenrollCourse, filterCourses } from '../../store/actions/course.actions';
import {
  selectFilteredCourses,
  selectCoursesLoading,
  selectEnrolledCount,
  selectTotalCourses
} from '../../store/selectors/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle, UpperCasePipe, AsyncPipe, FormsModule, RouterLink, TruncatePipe],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  private store = inject(Store<AppState>);

  // HO9: NgRx selectors
  courses$: Observable<Course[]> = this.store.select(selectFilteredCourses);
  loading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  enrolledCount$: Observable<number> = this.store.select(selectEnrolledCount);
  totalCourses$: Observable<number> = this.store.select(selectTotalCourses);

  // HO2: Two-way binding values
  searchTerm = '';
  selectedCategory = 'All';

  categories = ['All', 'Web Development', 'Backend', 'AI/ML', 'Database', 'Cloud'];

  levels = ['Beginner', 'Intermediate', 'Advanced'];

  ngOnInit(): void {
    // HO9: Dispatch load action
    this.store.dispatch(loadCourses());
  }

  // HO2: Event binding handlers
  onSearch(): void {
    this.store.dispatch(filterCourses({ searchTerm: this.searchTerm, category: this.selectedCategory }));
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.store.dispatch(filterCourses({ searchTerm: this.searchTerm, category }));
  }

  // HO9: Dispatch enroll/unenroll actions
  toggleEnroll(course: Course): void {
    if (course.enrolled) {
      this.store.dispatch(unenrollCourse({ courseId: course.id }));
    } else {
      this.store.dispatch(enrollCourse({ courseId: course.id }));
    }
  }

  // HO3: ngClass helper for category badge
  getCategoryClass(category: string): string {
    const map: Record<string, string> = {
      'Web Development': 'badge-web',
      'Backend': 'badge-backend',
      'AI/ML': 'badge-ai',
      'Database': 'badge-db',
      'Cloud': 'badge-cloud',
    };
    return map[category] || 'badge-primary';
  }

  getLevelClass(level: string): string {
    const map: Record<string, string> = {
      'Beginner': 'level-beginner',
      'Intermediate': 'level-intermediate',
      'Advanced': 'level-advanced',
    };
    return map[level] || '';
  }

  trackByCourse(index: number, course: Course): number {
    return course.id;
  }
}
