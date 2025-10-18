import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../orders/services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  imports: [ RouterLink , DecimalPipe ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  private readonly authService =inject(AuthService);
  private readonly orderService =inject(OrderService);
    private readonly cookieService = inject(CookieService);
  
  userNameChar:string=this.authService.getUserName()!.charAt(0).toUpperCase();
  userName:string=this.capitalizeFirstLetter( this.authService.getUserName()!);
  userEmail:string=this.authService.getUserEmail() ?? '';
  ordersLength:number=this.orderService.getOrdersLength() ?? 0;
  totalSpent:number= parseFloat(this.cookieService.get('totalSpending') || '0');
  
  ngOnInit():void{
    console.log(this.ordersLength);
    console.log(this.totalSpent);
  }
  

  capitalizeFirstLetter(name:string):string{
    if(!name ) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
  }
}
