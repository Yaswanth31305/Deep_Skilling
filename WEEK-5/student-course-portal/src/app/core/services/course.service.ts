// HO6 & HO8 — Course Service
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly apiUrl = 'http://localhost:3000/courses';
  private http = inject(HttpClient);

  // HO8: GET all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(() => of(this.getMockCourses()))
    );
  }

  // HO8: GET by ID
  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(this.getMockCourses().find(c => c.id === id)))
    );
  }

  // HO8: PUT — enroll/unenroll
  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      catchError(() => of({ id, ...course } as Course))
    );
  }

  // HO8: POST — register for course
  enrollCourse(courseId: number): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/${courseId}`, { enrolled: true }).pipe(
      catchError(() => of({ id: courseId, enrolled: true } as Course))
    );
  }

  unenrollCourse(courseId: number): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/${courseId}`, { enrolled: false }).pipe(
      catchError(() => of({ id: courseId, enrolled: false } as Course))
    );
  }

  getMockCourses(): Course[] {
    return [
      {
        id: 1, title: 'Angular Fundamentals', instructor: 'Dr. Raj Kumar',
        credits: 4, category: 'Web Development',
        description: 'A comprehensive course on Angular framework covering components, directives, services, routing and state management for building modern single-page applications.',
        duration: '12 weeks', enrolled: true, rating: 4.8, students: 245,
        startDate: '2026-08-01', level: 'Beginner'
      },
      {
        id: 2, title: 'Node.js & Express', instructor: 'Prof. Anita Singh',
        credits: 3, category: 'Backend',
        description: 'Build scalable server-side applications using Node.js and Express framework. Covers REST APIs, middleware, authentication, and database integration.',
        duration: '10 weeks', enrolled: true, rating: 4.6, students: 189,
        startDate: '2026-08-05', level: 'Intermediate'
      },
      {
        id: 3, title: 'Machine Learning Basics', instructor: 'Dr. Vikram Nair',
        credits: 5, category: 'AI/ML',
        description: 'Introduction to machine learning algorithms, data preprocessing, model training and evaluation using Python, scikit-learn, and TensorFlow.',
        duration: '16 weeks', enrolled: false, rating: 4.9, students: 312,
        startDate: '2026-09-01', level: 'Intermediate'
      },
      {
        id: 4, title: 'Database Management', instructor: 'Prof. Sunita Rao',
        credits: 3, category: 'Database',
        description: 'Relational and NoSQL database design, SQL queries, indexing, transactions, normalization and database optimization techniques.',
        duration: '8 weeks', enrolled: true, rating: 4.5, students: 201,
        startDate: '2026-08-10', level: 'Beginner'
      },
      {
        id: 5, title: 'Cloud Computing (AWS)', instructor: 'Mr. Deepak Joshi',
        credits: 4, category: 'Cloud',
        description: 'Comprehensive guide to AWS cloud services including EC2, S3, Lambda, RDS, VPC, IAM and best practices for cloud architecture design.',
        duration: '14 weeks', enrolled: false, rating: 4.7, students: 156,
        startDate: '2026-09-15', level: 'Advanced'
      },
      {
        id: 6, title: 'React.js Development', instructor: 'Ms. Kavya Patel',
        credits: 3, category: 'Web Development',
        description: 'Modern React development with hooks, context API, Redux, React Router and best practices for building performant user interfaces.',
        duration: '10 weeks', enrolled: false, rating: 4.6, students: 278,
        startDate: '2026-08-20', level: 'Intermediate'
      }
    ];
  }
}
