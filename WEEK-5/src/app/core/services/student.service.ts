// HO6 & HO8 — Student Service: data management with HTTP
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly apiUrl = 'http://localhost:3000/students';
  private http = inject(HttpClient);

  // HO8: GET all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      catchError(() => of(this.getMockStudents()))
    );
  }

  // HO8: GET single student by ID
  getStudentById(id: number): Observable<Student | undefined> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(this.getMockStudents().find(s => s.id === id)))
    );
  }

  // HO8: POST — add new student
  addStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      catchError(() => of({ ...student, id: Date.now() } as Student))
    );
  }

  // HO8: PUT — update student
  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student).pipe(
      catchError(() => of({ id, ...student } as Student))
    );
  }

  // HO8: DELETE
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }

  // Fallback in-memory data when API is not available
  getMockStudents(): Student[] {
    return [
      {
        id: 1,
        name: 'Yaswanth Reddy',
        email: 'yaswanth@college.edu',
        department: 'Computer Science',
        year: 3,
        phone: '+91-9876543210',
        enrolledCourses: [1, 2, 4],
        joinedDate: '2022-08-15',
        gpa: 8.7,
        avatar: ''
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@college.edu',
        department: 'Information Technology',
        year: 2,
        phone: '+91-9876543211',
        enrolledCourses: [1, 3],
        joinedDate: '2023-08-10',
        gpa: 9.1,
        avatar: ''
      },
      {
        id: 3,
        name: 'Arjun Mehta',
        email: 'arjun@college.edu',
        department: 'Electronics',
        year: 4,
        phone: '+91-9876543212',
        enrolledCourses: [2, 5],
        joinedDate: '2021-08-20',
        gpa: 7.8,
        avatar: ''
      }
    ];
  }
}
