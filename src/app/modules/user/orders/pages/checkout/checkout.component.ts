import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorMessageComponent } from '../../../../../shared/components/error-message/error-message.component';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly orderService = inject(OrderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  errorMessage:string='';
  isloading:boolean=false;
  cartId: string='';
  checkOutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  egyptianPhoneValidator(): ValidatorFn {
    const regex = /^01[0125][0-9]{8}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // لو فاضي بنسيبه للـrequired
      return regex.test(control.value) ? null : { egyptPhone: true };
    };
  }
  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.cartId = urlParams.get('id') as string;
        // this.cartId = urlParams.get('id') ;
        // this.cartId = urlParams.get('id') ?? '';
        // console.log(this.cartId);
      }
    })
  }
  initForm(): void {
    this.checkOutForm = this.formBuilder.group({
      //بعمل الفورم جروب جواها فروج جروب تانية
      //object inside object
      // shippingAddress:this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null,[Validators.required,this.egyptianPhoneValidator()],
      ],
      city: [null, [Validators.required]],
      // })
    });
  }

  getValues() {
    if (this.checkOutForm.valid) {
      this.isloading=true;
      console.log(this.checkOutForm.value); //send to api
      this.orderService.checkoutSession(this.cartId,this.checkOutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.status==='success'){
            window.open(res.session.url,'_self');
          }
        },
        error: (err) => {
          console.log(err.error);
          this.errorMessage=err.error.message;
          this.isloading=false;
        }
      });
    }
    else{
      this.checkOutForm.markAllAsTouched();
    }
  }
}
