import { HttpInterceptorFn } from '@angular/common/http';
import { tap, finalize } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const start = Date.now();
  console.log(`[HTTP] ➡ ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      next: (event) => {

      },
      error: (err) => {
        console.error(`[HTTP] ✗ ${req.method} ${req.url}`, err.status, err.message);
      }
    }),
    finalize(() => {
      const elapsed = Date.now() - start;
      console.log(`[HTTP] ✓ ${req.method} ${req.url} — ${elapsed}ms`);
    })
  );
};
