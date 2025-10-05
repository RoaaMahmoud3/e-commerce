import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/iproduct';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { AudioService } from '../../../../../core/services/audio.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent ,NgxPaginationModule , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  productList:IProduct[]=[];
  private readonly productsService=inject(ProductsService);
  private readonly CartService=inject(CartService);
  private readonly ToastrService=inject(ToastrService);
  private readonly wishlistService=inject(WishlistService);
  private readonly audioService=inject(AudioService);
  
  pageSize!:number;
  p!:number;
  total!:number;
  word:string="";

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(pageNumber:number=1){
    this.productsService.getAllProducts(pageNumber).subscribe({
      next:(response)=>{
        this.productList=response.data;
        this.pageSize=response.metadata.limit;
        this.p=response.metadata.currentPage;
        this.total=response.results;
      }
    })
  }
  addToCart(id:string){
    this.CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status=='success'){
          this.ToastrService.success(res.message,'',{
            progressBar:true,
            closeButton:true,
            // positionClass:"toast-bottom-right"
          });
          this.CartService.cartCounter.set(res.numOfCartItems);
          this.audioService.playNote();
        }
      }
    })
  }
  addToWishlist(id:string){
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        if(res.status==='success'){
          this.ToastrService.success(res.message,'',{
            progressBar:true,
            closeButton:true,
          });
          this.wishlistService.wishlistCounter.set(res.data.length);
          this.audioService.playNote();
        }
      }
    })
  }
}
