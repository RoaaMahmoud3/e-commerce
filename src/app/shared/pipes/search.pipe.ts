import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  
  transform(arr:any[], word:string): any[] {
  return arr.filter(item =>((item.title || item.name)).toLowerCase().includes(word.toLowerCase()));
  }

}
