import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { IWishlist } from '../../models/iwishlist';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../cart/services/cart.service';
import { AudioService } from '../../../../../core/services/audio.service';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  private readonly wishlistService=inject(WishlistService);
  private readonly toastrService=inject(ToastrService);
  private readonly cartService=inject(CartService);
  private readonly audioService=inject(AudioService);
  

  wishlistItems:IWishlist={} as IWishlist;

  ngOnInit(): void {
    this.loadWishlistItems();
  }
  loadWishlistItems():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistItems=res;
      }
    })
  }
  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status==='success'){
          this.toastrService.success(res.message,'',{
            progressBar:true,
            closeButton:true,
          });
          this.cartService.cartCounter.set(res.numOfCartItems);
          this.audioService.playNote();
        }
      },
    })
  }
  removeSpecificWishlistItem(productId:string){
    this.wishlistService.removeProductFromWishlist(productId ).subscribe({
      next:(res)=>{
        this.toastrService.warning('Product deleted from wishlist !','Remove item :',{
          progressBar:true,
          closeButton:true,
        })
        this.wishlistService.wishlistCounter.set(res.data.length);
        this.audioService.playRemove();
        this.loadWishlistItems();
      }
    })
  }
}