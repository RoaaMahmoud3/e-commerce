import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient=inject(HttpClient);
  cartCounter:WritableSignal<number>= signal(0);
  
  addProductToCart(productId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'cart',
      {
         productId
         // or productId:productId  عشان نفس الاسم
      },
    )
  }
  updateCartCount(productId:string , count:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`cart/${productId}`,
      {
        count
      }
    )
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`cart`)
  }
  removeSpecificCartItem(productId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`cart/${productId}`)
  }
  clearUserCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`cart`)
  }
  
}
