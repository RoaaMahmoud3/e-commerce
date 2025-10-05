import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/ICart.interface';

@Component({
  selector: 'cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item:Product={} as Product
  @Output() removeItem:EventEmitter<string>= new EventEmitter<string>();
  @Output() updateCount= new EventEmitter<{id:string,count:number}>();

  onRemoveItem(){
    this.removeItem.emit(this.item.product._id);
  }
  onUpdateCartCount(count:number){
    this.updateCount.emit({id:this.item.product._id , count});
    // object there are 2 types
  }
}
