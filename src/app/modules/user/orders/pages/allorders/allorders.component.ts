import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { IOrderDetails } from '../../models/iorder-details';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-allorders',
  imports: [ DatePipe ],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);

  totalSpending:number=0; 
  userId: string='';
  ordersList:IOrderDetails[]=[]

  ngOnInit(): void {
    this.getUserIdFromToken();
    this.getAllUserOrders();
  }
  getUserIdFromToken(): void {
    const decoded: any = this.authService.decodedToken();
    this.userId = decoded?.id || '';
    // console.log('userId from token:', this.userId);
  }
  getAllUserOrders(){
    this.orderService.getUserOrders(this.userId).subscribe({
      next:(res )=>{
        this.ordersList=res;
        this.orderService.saveOrdersLength(res.length);
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }
  getTotalSpending():void{
    this.orderService.getUserOrders(this.userId).subscribe({
      next:(res )=>{
        for(let order of res){
          this.totalSpending += order.totalOrderPrice;
        }
        this.cookieService.set('totalSpending', this.totalSpending.toString());
      }
    })
  }

}
