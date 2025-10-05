import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  
  return next(req).pipe(catchError((err=>{
    //logic to handle error
    console.log('Interceptor : ',err);
    toastrService.error(err.error.message ,'',{
      progressBar:true,
      closeButton:true,
      timeOut:3000
    });
    return throwError(()=>err);
  })))
};
