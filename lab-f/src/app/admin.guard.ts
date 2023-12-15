import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  
  if (authService.isAdmin()) {
    return true;
  }
  
  const router = inject(Router)
  return router.parseUrl('/');
};
