import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let store: MockStore;

  const initialState = {
    students: { ids: [], entities: {}, loading: false, error: null, selectedStudentId: null },
    courses: { ids: [], entities: {}, loading: false, error: null, searchTerm: '', categoryFilter: 'All' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should set greeting on init', () => {
    expect(component.greeting()).toBeTruthy();
  });

  it('should update search term on search change', () => {
    component.onSearchChange('Angular');
    expect(component.searchTerm()).toBe('Angular');
  });
});
