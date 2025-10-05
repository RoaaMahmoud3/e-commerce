import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { IOrderDetails } from '../../models/iorder-details';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [ DatePipe ],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
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
        // console.log(res);
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

}
