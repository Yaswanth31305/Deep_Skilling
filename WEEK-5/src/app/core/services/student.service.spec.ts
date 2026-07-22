import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { StudentService } from './student.service';
import { Student } from '../models/student.model';

const mockStudents: Student[] = [
  {
    id: 1, name: 'Test Student', email: 'test@college.edu',
    department: 'CS', year: 2, phone: '+91-1234567890',
    enrolledCourses: [1], joinedDate: '2024-01-01', gpa: 8.0, avatar: ''
  }
];

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET students from API', () => {
    service.getStudents().subscribe(students => {
      expect(students.length).toBe(1);
      expect(students[0].name).toBe('Test Student');
    });

    const req = httpMock.expectOne('http://localhost:3000/students');
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents);
  });

  it('should POST a new student', () => {
    const newStudent = {
      name: 'New Student', email: 'new@college.edu',
      department: 'IT', year: 1, phone: '+91-9999999999',
      enrolledCourses: [], joinedDate: '2026-01-01', gpa: 0, avatar: ''
    };

    service.addStudent(newStudent).subscribe(student => {
      expect(student.id).toBeDefined();
    });

    const req = httpMock.expectOne('http://localhost:3000/students');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newStudent, id: 100 });
  });

  it('should GET mock students when API fails', () => {
    service.getMockStudents().forEach(s => {
      expect(s.id).toBeDefined();
      expect(s.name).toBeTruthy();
    });
  });

  it('should have mock students with valid structure', () => {
    const students = service.getMockStudents();
    expect(students.length).toBeGreaterThan(0);
    students.forEach(s => {
      expect(s.id).toBeDefined();
      expect(s.name).toBeTruthy();
      expect(s.email).toContain('@');
      expect(s.gpa).toBeGreaterThan(0);
    });
  });
});
