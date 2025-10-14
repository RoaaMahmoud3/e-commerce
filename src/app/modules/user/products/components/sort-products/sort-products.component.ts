import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-products',
  imports: [],
  templateUrl: './sort-products.component.html',
  styleUrl: './sort-products.component.scss'
})
export class SortProductsComponent {
   @Output() sortChanged = new EventEmitter<string>();
  isSortOpen:boolean=false;
  selectedSort = 'Newest First';

  toggleSortMenu() {
    this.isSortOpen = !this.isSortOpen;
  }
  selectSort(option: string){
    this.selectedSort=option;
    this.isSortOpen = false;
    this.sortChanged.emit(option); //send to parent now
  }
}
