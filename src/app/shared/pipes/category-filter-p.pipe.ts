import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilterP'
})
export class CategoryFilterPPipe implements PipeTransform {

  transform(arr:any[], catName:string): any[] {
    if (!arr) return [];
    if (!catName || catName === 'All') return arr;
    const lowerCat = catName.toLowerCase();
    return arr.filter((item) =>
      item.category?.name?.toLowerCase()===lowerCat
    );
  }

}
