import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  if(authService.isloggedIn()){//if there is get 'token'
    return true; // home cart products can login in
  }
  else{
    //navigate to login
    return router.parseUrl('/login')
  }
};
