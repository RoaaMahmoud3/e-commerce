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
import { Icategory } from '../../../categories/models/icategory';
import { CategoryFilterPPipe } from '../../../../../shared/pipes/category-filter-p.pipe';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { SortProductsComponent } from "../../components/sort-products/sort-products.component";

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, NgxPaginationModule, SearchPipe, FormsModule, CategoryFilterPPipe
    , CategoryFilterComponent, SortProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  productList:IProduct[]=[];
  wishlistProductIds: string[] = [];
  categories: Icategory[] = [];
  selectedCategory: string = 'All';
  selectedSort = 'Newest First';
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
    this.loadWishlistIds();
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
  loadWishlistIds(): void {
  this.wishlistService.getLoggedUserWishlist().subscribe({
    next: (res) => {
      this.wishlistProductIds = res.data.map((item: any) => item._id);
    },
    error: (err) => console.log(err)
  });
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
          this.loadWishlistIds();
        }
      }
    })
  }
  onSortChanged(option: string) {
    switch (option) {
      case 'Newest First':
        this.productList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Oldest First':
        this.productList.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'Price: Low to High':
        this.productList.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        this.productList.sort((a, b) => b.price - a.price);
        break;
      case 'Highest Rated':
        this.productList.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
        break;
    }
    this.productList = [...this.productList];
  }
}
