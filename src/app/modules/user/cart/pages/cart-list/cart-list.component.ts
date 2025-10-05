import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../models/ICart.interface';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AudioService } from '../../../../../core/services/audio.service';


@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly audioService=inject(AudioService);
  cartDetails:ICart={} as ICart;

  ngOnInit(): void {
    this.loadCartItems();
  }
  loadCartItems(){
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartDetails=res;
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
  removeSpecificCartItem(productId:string){
    this.cartService.removeSpecificCartItem(productId).subscribe({
      next:(res)=>{
        this.toastrService.warning('Product deleted !','Remove item :',{
          progressBar:true,
          closeButton:true,
        })
        this.cartDetails=res;
        this.cartService.cartCounter.set(res.numOfCartItems);
        this.audioService.playRemove();
        
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
  updateCartCount(productId:string, count:number){
    this.cartService.updateCartCount(productId,count).subscribe({
      next:(res)=>{
        this.toastrService.success('Product updated','Update item :',{
          progressBar:true,
          closeButton:true,
        })
        this.cartDetails=res;
        this.cartService.cartCounter.set(res.numOfCartItems);
        this.audioService.playNote();

      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
  clearAllCart(){
    this.cartService.clearUserCart().subscribe({
      next:(res)=>{
        if(res.message==='success'){
          this.cartService.cartCounter.set(res.numOfCartItems);
          this.toastrService.info('Removed all items','Clear cart :',{
            progressBar:true,
            closeButton:true,
          });
          this.loadCartItems();
        }
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
}
