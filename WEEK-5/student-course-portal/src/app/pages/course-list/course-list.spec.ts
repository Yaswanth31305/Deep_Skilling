// HO10 — Unit Tests for CourseList Component (Vitest)
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseList } from './course-list';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const initialState = {
    students: { ids: [], entities: {}, loading: false, error: null, selectedStudentId: null },
    courses: { ids: [], entities: {}, loading: false, error: null, searchTerm: '', categoryFilter: 'All' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList, RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create course list component', () => {
    expect(component).toBeTruthy();
  });

  it('should have category filters including "All"', () => {
    expect(component.categories).toContain('All');
    expect(component.categories.length).toBeGreaterThan(3);
  });

  it('should update selectedCategory on category change', () => {
    component.onCategoryChange('Backend');
    expect(component.selectedCategory).toBe('Backend');
  });
});
