import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

const mockCourses: Course[] = [
  {
    id: 1, title: 'Angular Fundamentals', instructor: 'Dr. Test',
    credits: 4, category: 'Web Development',
    description: 'Test description for Angular course.',
    duration: '12 weeks', enrolled: false, rating: 4.8,
    students: 100, startDate: '2026-08-01', level: 'Beginner'
  }
];

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET courses from API', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(1);
      expect(courses[0].title).toBe('Angular Fundamentals');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should PATCH enroll a course', () => {
    service.enrollCourse(1).subscribe(course => {
      expect(course.enrolled).toBe(true);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('PATCH');
    req.flush({ ...mockCourses[0], enrolled: true });
  });

  it('should PATCH unenroll a course', () => {
    service.unenrollCourse(1).subscribe(course => {
      expect(course.enrolled).toBe(false);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('PATCH');
    req.flush({ ...mockCourses[0], enrolled: false });
  });

  it('should return mock courses with valid data', () => {
    const courses = service.getMockCourses();
    expect(courses.length).toBeGreaterThan(0);
    courses.forEach(c => {
      expect(c.id).toBeDefined();
      expect(c.title).toBeTruthy();
      expect(c.credits).toBeGreaterThan(0);
      expect(c.rating).toBeGreaterThan(0);
    });
  });
});
