import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../../categories/models/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule, RouterLink],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit{
  private readonly categoriesService=inject(CategoriesService);
  categoriesList:Icategory[]=[];

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag:true,
    touchDrag:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left text-main"></i>', '<i class="fa-solid fa-arrow-right text-main"></i>'],
    margin:10,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
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
