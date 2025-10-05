import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CartService } from '../../../modules/user/cart/services/cart.service';
import { WishlistService } from '../../../modules/user/wishlist/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports:[ RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isMoblieOpen:boolean=false;
  cartCounter:Signal<number> =computed( ()=>this.cartService.cartCounter());
  wishListCounter:Signal<number> =computed( ()=>this.wishlistService.wishlistCounter())
  @Input() authType:string=''
  private readonly authService=inject(AuthService);
  private readonly cartService=inject(CartService);
  private readonly wishlistService=inject(WishlistService);
  private readonly platformId =inject(PLATFORM_ID);
  toggleMobileMenu(){
    this.isMoblieOpen=!this.isMoblieOpen;
  }

  signOut():void{
    this.authService.logOut();
  }

  ngOnInit(): void {
    // console.log(this.authService.decodedToken())
    
    // cart counter
    if(this.authService.isloggedIn()){
      if(isPlatformBrowser(this.platformId)){
        this.getAllCardItems();
      }
    }

    // wishlist coumter
    if(this.authService.isloggedIn()){
      if(isPlatformBrowser(this.platformId)){
        this.getAllWishlistItems();
      }
    }
  }


  getAllCardItems(){
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartCounter.set(res.numOfCartItems);
      }
    });
  }
  getAllWishlistItems(){
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistService.wishlistCounter.set(res.data.length);
      }
    });
  }
}
