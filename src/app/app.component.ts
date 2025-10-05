import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from "ngx-spinner";
// declare const AOS: any; 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fresh-card';
  // ngOnInit(): void {
  //   AOS.init({
  //     duration: 1000,
  //     once: false
  //   });
  // }
}
