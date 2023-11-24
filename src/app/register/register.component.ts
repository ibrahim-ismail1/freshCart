import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthontcationService } from '../authontcation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthontcationService:AuthontcationService,
                private _Router:Router){}
  messageError!:string;
  loading:boolean=false;

  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^((01)|(0021))[0125][0-9]{8}$/)]),
  },this.ConformationPassword)

  RegisterSubmit(rForm:FormGroup)
  {
    this.loading=true;
    this._AuthontcationService.SendRegister(rForm.value).subscribe({

      next:(res)=>{
        this._Router.navigate(['/login'])
        this.loading=false;
      },
      error:(err)=>{
        this.messageError= err.error.message;
        this.loading=false;
        
      }
    })
    
  }
  ConformationPassword(fg:any)
  {
    return fg.get('password')?.value===fg.get('rePassword')?.value ? null : {'mismatch': true};
  }
}
