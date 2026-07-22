// HO7 — Route Guard: protects routes that require authentication
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to register page if not authenticated
  router.navigate(['/register'], { queryParams: { returnUrl: state.url } });
  return false;
};
