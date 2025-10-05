import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IOrderDetails } from '../models/iorder-details';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly httpClient=inject(HttpClient);
  private readonly authService=inject(AuthService);

  checkoutSession(cartId:string,data:object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${cartId}?url=http://localhost:4200`
      ,data);
  }
  getUserOrders(userId: string): Observable<IOrderDetails[]> {
    return this.httpClient.get<IOrderDetails[]>(environment.baseUrl + `orders/user/${userId}`);
  }

}
