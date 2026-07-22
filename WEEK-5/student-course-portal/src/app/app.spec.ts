// HO10 — App Root Spec Test
import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('App', () => {
  const initialState = {
    students: { ids: [], entities: {}, loading: false, error: null, selectedStudentId: null },
    courses: { ids: [], entities: {}, loading: false, error: null, searchTerm: '', categoryFilter: 'All' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have portalTitle property', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.portalTitle).toBe('Student Course Portal');
  });
});
