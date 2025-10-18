import { Component, inject } from '@angular/core';
import { ErrorMessageComponent } from "../../../../shared/components/error-message/error-message.component";
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators , ReactiveFormsModule, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ErrorMessageComponent , ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  private readonly formBuilder=inject(FormBuilder);
  errorMessage:string='';
  isloading:boolean=false;
  flag:boolean=true;

  //form group multiple inputs
  authForm= this.formBuilder.group({
  email: ['',[Validators.required,Validators.email]],
  password: ['',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  },)


  getValues(){
    if(this.authForm.valid){
      this.isloading=true;
      console.log(this.authForm.value); //send to api 
      this.authService.login(this.authForm.value).subscribe({
        next:(res)=>{ 
          if(res.message=='success'){
            this.authService.saveToken(res.token);
            this.authService.saveInformationAboutUser(res.user.name , res.user.email , res.user.role);
            this.authService.decodedToken();
            this.router.navigate(['/home']);
            this.isloading=false;
          }
        },
        error:(err)=>{ 
          console.log(err.error);
          this.errorMessage=err.error.message;
          this.isloading=false;
         }
      })
    }
    else{
      this.authForm.markAllAsTouched();
      //mark all form controls as touched to show errors
    }
  }
}
