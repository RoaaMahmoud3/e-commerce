import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ErrorMessageComponent } from "../../../../shared/components/error-message/error-message.component";
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { checkPasswordValidator } from '../../../../shared/helpers/password-match';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  errorMessage:string='';
  isloading:boolean=false;
  authForm!:FormGroup;
  flag:boolean=true;
  

  //form group multiple inputs
  formInit(){
    this.authForm= new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword: new FormControl('',[Validators.required])
    }, {validators: checkPasswordValidator})
  }

  getValues(){
    if(this.authForm.valid){
      this.isloading=true;
      console.log(this.authForm.value); //send to api 
      this.authService.register(this.authForm.value).subscribe({
        next:(res)=>{ 
          console.log(res);
          if(res.message=='success'){
            this.router.navigate(['/login']);
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
      // this.authForm.get('rePassword')?.setValue(' . ');
      this.authForm.markAllAsTouched();
      //mark all form controls as touched to show errors
    }
  }
  ngOnInit(): void{
    this.formInit();
  }
}
