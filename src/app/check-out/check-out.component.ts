import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckingOutService } from '../checking-out.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  
constructor(private _ActivatedRoute:ActivatedRoute,private _CheckingOutService:CheckingOutService
            ,private _Router:Router,private _CartService:CartService){}

  isCridet!:boolean
  cartId:string=this._ActivatedRoute.snapshot.params["cartId"];
  payForm:FormGroup=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^((01)|(0021))[0125][0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required])

  })
  PaymentWay(clickI:boolean)
  {
    this.isCridet=clickI;
  }
  
  paySubmit(pF:FormGroup)
  {
      if(this.isCridet==true)
      {
        this._CheckingOutService.CridetSend(this.cartId,pF.value).subscribe({
          next:(res)=>{
            console.log(res);
            localStorage.setItem('isCridet','true')
           
            window.location.href=res.session.url
            localStorage.setItem('userCartItems','0')

  
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
        
      }
      else
      {
      this._CheckingOutService.CashSend(this.cartId,pF.value).subscribe({
        next:(res)=>{
         alert('order complete')
         
         this._Router.navigate(['/allorders'])
         this._CartService.noOfItems.next(0)
         
         

        },
        error:(err)=>{
          alert(err.message)
        }
      })
        
      }
      
  }

}
