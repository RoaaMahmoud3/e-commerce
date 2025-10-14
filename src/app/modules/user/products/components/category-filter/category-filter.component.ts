import { Component, forwardRef, Input, OnInit, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Icategory } from '../../../categories/models/icategory';
import { CategoriesService } from '../../../categories/services/categories.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryFilterComponent),
      multi: true,
    },
  ],
})
export class CategoryFilterComponent implements OnInit, ControlValueAccessor {
  private readonly categoryService = inject(CategoriesService);
  @Input() categoriesList: Icategory[] = [];
  isOpen = false;
  selectedCategory = 'All';

  // 
  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories():void{
    this.categoryService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList=res.data;
        console.log(res.data)
      }
    })
  }
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectCategory(name: string): void {
    this.selectedCategory = name;
    this.isOpen = false;
    this.onChange(name);   // send to parent
    this.onTouched();
  }

  // ControlValueAccessor
  writeValue(value: string | null): void {
    this.selectedCategory = value || 'All';
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}