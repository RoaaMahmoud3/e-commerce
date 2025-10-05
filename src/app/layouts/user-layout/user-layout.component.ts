import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
