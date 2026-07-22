// HO8 — HTTP Interceptor: attaches auth token to every request
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('scp_token') || 'demo-token-12345';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return next(authReq);
};
