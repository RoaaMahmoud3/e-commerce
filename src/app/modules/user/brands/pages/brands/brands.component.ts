import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { IBrands } from '../../models/ibrands';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule  , FormsModule , UpperCasePipe , SearchPipe ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService=inject(BrandsService);
  brandsList:IBrands[]=[];
  pageSize!:number;
  p!:number;
  total!:number;
  text:string="";

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(pageNumber:number=1){
    this.brandsService.getAllBrands(pageNumber).subscribe({
      next:(res)=>{
        this.brandsList=res.data;
        this.pageSize=res.metadata.limit;
        this.p=res.metadata.currentPage;
        this.total=res.results;
      }
    })
  }
}
