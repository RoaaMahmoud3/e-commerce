import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpClient=inject(HttpClient);
  wishlistCounter:WritableSignal<number>= signal(0);

  addProductToWishlist(productId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'wishlist',{productId});
  }
  removeProductFromWishlist(productId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`wishlist/${productId}`);
  }
  getLoggedUserWishlist():Observable<any>{
    return this.httpClient.get(environment.baseUrl+'wishlist');
  }
}
