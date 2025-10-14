import { Component, Input, Output , EventEmitter} from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'product-card',
  imports: [RouterLink , UpperCasePipe , TitleCasePipe ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product:IProduct={} as IProduct;
  @Output() addToCart:EventEmitter<string> = new EventEmitter<string>();
  @Output() addToWishlist:EventEmitter<string> = new EventEmitter<string>();
  @Input() wishlistProductIds: string[] = [];

  onAddToCart(){
    this.addToCart.emit(this.product._id);
  }
  onAddToWishlist(){
    this.addToWishlist.emit(this.product._id);
  }
}
