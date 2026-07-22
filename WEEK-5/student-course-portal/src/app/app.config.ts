// HO7+HO8+HO9 — App Config: Router, HttpClient, NgRx Store, Interceptors
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { studentReducer } from './store/reducers/student.reducer';
import { courseReducer } from './store/reducers/course.reducer';
import { StudentEffects } from './store/effects/student.effects';
import { CourseEffects } from './store/effects/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // HO7: Router with view transitions
    provideRouter(routes, withViewTransitions()),

    // HO8: HttpClient with functional interceptors
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor])
    ),

    // HO9: NgRx Store with feature reducers
    provideStore({
      students: studentReducer,
      courses: courseReducer,
    }),

    // HO9: NgRx Effects
    provideEffects([StudentEffects, CourseEffects]),
  ]
};
