// HO10 — Unit Tests for StudentProfile Component (Vitest)
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { StudentProfile } from './student-profile';

describe('StudentProfile', () => {
  let component: StudentProfile;
  let fixture: ComponentFixture<StudentProfile>;
  let store: MockStore;

  const initialState = {
    students: { ids: [], entities: {}, loading: false, error: null, selectedStudentId: null },
    courses: { ids: [], entities: {}, loading: false, error: null, searchTerm: '', categoryFilter: 'All' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfile, RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(StudentProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create student profile component', () => {
    expect(component).toBeTruthy();
  });

  it('should default to overview tab', () => {
    expect(component.activeTab()).toBe('overview');
  });

  it('should switch tabs', () => {
    component.setTab('courses');
    expect(component.activeTab()).toBe('courses');
    component.setTab('classmates');
    expect(component.activeTab()).toBe('classmates');
  });

  it('should calculate GPA grade correctly', () => {
    expect(component.getGpaGrade(9.5)).toBe('A+');
    expect(component.getGpaGrade(8.2)).toBe('A');
    expect(component.getGpaGrade(7.5)).toBe('B+');
    expect(component.getGpaGrade(6.0)).toBe('B');
  });
});
