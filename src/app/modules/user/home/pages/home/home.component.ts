import { Component } from '@angular/core';
import { MainSliderComponent } from "../../components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "../../components/popular-categories/popular-categories.component";
import { ProductsComponent } from "../../../products/pages/products/products.component";

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoriesComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
