import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AudioService } from '../../../../../core/services/audio.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  id:any;
  product:IProduct={} as IProduct;
  isClose:boolean=false;
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productsService=inject(ProductsService);
  private readonly router=inject(Router);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly audioService=inject(AudioService);
  

  ngOnInit(): void {
    this.getId();
    this.getProductById();
  }
  getId(){
    return this.activatedRoute.paramMap.subscribe({
      next:(value)=>{
        this.id=value.get('id');
      }
    })
  }
  getProductById(){
    this.productsService.getProductById(this.id).subscribe({
      next:(response)=>{
        this.product=response.data;
      }
    })
  }
  
  toClose(){
    this.router.navigate(['/products'])
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
      }
    })
  }
}
