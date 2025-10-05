import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../../../../shared/components/error-message/error-message.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  verifyEmail!:FormGroup;
  verifyCode!:FormGroup;
  resetPassword!:FormGroup;
  step:number=1;
  flag:boolean=true;

  ngOnInit(): void {
    this.initForm();
  }

  initForm():void{
    this.verifyEmail=this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]]
    });

    this.verifyCode=this.formBuilder.group({
      resetCode:[null,[Validators.required]]
    });

    this.resetPassword=this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      newPassword:[null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    })
  }

  formStepOne():void{
    if(this.verifyEmail.valid){
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.step=2;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    }
  }
  formStepTwo():void{
    if(this.verifyCode.valid){
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.step=3;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    }
  }
  formStepThree():void{
    if(this.resetPassword.valid){
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.authService.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    }
  }
}
