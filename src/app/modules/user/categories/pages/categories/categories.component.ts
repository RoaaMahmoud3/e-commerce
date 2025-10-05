import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Icategory } from '../../models/icategory';
import { UpperCasePipe } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { SearchPipe } from '../../../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-categories',
  imports: [UpperCasePipe , FormsModule , SearchPipe ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService=inject(CategoriesService);
  categoriesList:Icategory[]=[];
  text:string=''
  
  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList=res.data;
      }
    })
  }


}
