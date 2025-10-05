import { CanActivateFn , Router} from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  if(authService.isloggedIn()){    //if there is get 'token'
    return router.parseUrl('/home');
    //لو مسجل دخول هرجعك لل home
  }
  else{
    //لو مش مسجل هدخلك المكان الي هحطك عليه في الroutes
    return true;
  }
};
