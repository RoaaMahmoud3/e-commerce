import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly httpClient=inject(HttpClient);
  private readonly cookieService=inject(CookieService);
  private readonly router=inject(Router);
  register(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/signup',data)
  }

  login(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/signin',data)
  }

  logOut():void{
    //remove token
    // 
    this.cookieService.delete('token')
    this.router.navigate(['/login'])
  }

  decodedToken(){
    let decoded;

    try{
      decoded = jwtDecode(this.cookieService.get('token'));
      console.log(decoded);
    }
    catch{
      this.logOut();
    }

    return decoded;
  }

  saveToken(token:string){
    this.cookieService.set('token',token);
  }
  getToken():string|null{
    const token= this.cookieService.get('token');
    return token ? token : null ;
  }
  isloggedIn():boolean{
    return !!this.getToken();
  }

  submitVerifyEmail(data:Object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/forgotPasswords',data);
  }
  submitVerifyCode(data:Object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'auth/verifyResetCode',data);
  }
  submitResetPassword(data:Object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+'auth/resetPassword',data);
  }
}
