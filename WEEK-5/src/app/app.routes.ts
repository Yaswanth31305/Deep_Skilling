import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Dashboard | Student Course Portal'
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/course-list/course-list').then(m => m.CourseList),
    title: 'Course Catalog | Student Course Portal'
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile),
    canActivate: [authGuard],
    title: 'My Profile | Student Course Portal'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register),
    title: 'Register | Student Course Portal'
  },
  {
    path: 'course-register',
    loadComponent: () => import('./pages/course-register/course-register').then(m => m.CourseRegister),
    canActivate: [authGuard],
    title: 'Course Registration | Student Course Portal'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
