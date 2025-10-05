import { AbstractControl } from "@angular/forms";


export const checkPasswordValidator=(control:AbstractControl)=>{
    return control.get('password')?.value === control.get('rePassword')?.value ? null : {missmatch:true};
    //if match return null else return object with error
}