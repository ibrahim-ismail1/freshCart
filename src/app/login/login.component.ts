import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthontcationService } from '../authontcation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  messageError!:string;
  loading:boolean=false;
  iscode:boolean=false;
  isNewPass:boolean=false;
  ForgetMessageError!:string;
  constructor(private _AuthontcationService:AuthontcationService,
            private _Router:Router){}
  loginForm:FormGroup=new FormGroup({

    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z]/)])

  })
  ForgetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  CodeVerfication:FormGroup=new FormGroup ({
    resetCode:new FormControl(null,[Validators.required])

  })
  ResetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/)])
  })



  LoginSubmit(lFr:FormGroup)
  {
    this.loading=true;
    this._AuthontcationService.SendLogin(lFr.value).subscribe({
      next:(res)=>{
        if(res.message =='success'){
          this._Router.navigate(['/home'])
          localStorage.setItem('userToken',res.token)
          this._AuthontcationService.SaveData()
          
          
        }
       
        
        this.loading=false;
      },
      error:(err)=>{
        this.messageError=err.error.message;
        this.loading=false;
      }
    })
    
  }
  ForgetPasswordSubmit(eFr:FormGroup)
  {
    this._AuthontcationService.SendEmailVer(eFr.value).subscribe({
      next:(res)=>{
       if(res.statusMsg=='success')
       {
        this.iscode=true;
       }
        
      },
      error:(err)=>{
        this.ForgetMessageError=err.message;
        
      }
    })
  }
  ResteCodeSubmit(rCo:FormGroup)
  {
    this._AuthontcationService.SendVerifaction(rCo.value).subscribe({
      next:(res)=>{
        if(res.status=='Success')
        {
          this.iscode=false;
          this.isNewPass=true;
        }
        
      },
      error:(err)=>{
        this.ForgetMessageError=err.error.message
      }
    })
  }
  ResetPasswordSubmit(rPa:FormGroup)
  {
    this._AuthontcationService.SendNewPass(rPa.value).subscribe({
      next:(res)=>{
      this._Router.navigate(['/home'])
       localStorage.setItem('userToken', res.token)
       this._AuthontcationService.SaveData()
        
      },
      error:(err)=>{
        this.ForgetMessageError=err.error.message
        
      }
    })
  }

}
