import { Component } from '@angular/core';
import { AuthontcationService } from '../authontcation.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogin:boolean=false;
  navNoOfItems!:string;
  constructor(private _AuthontcationService:AuthontcationService,
              private _Router:Router,private _CartService:CartService ){

  }
  ngOnInit():void{
 
    this._AuthontcationService.userDataToken.subscribe(()=>{

      if(this._AuthontcationService.userDataToken.getValue()==null)
      {
        this.isLogin=false;
      }
      else{
        this.isLogin=true;
      }
   
     
    })
    this?._CartService.noOfItems.subscribe(()=>{
        
      this.navNoOfItems=this._CartService.noOfItems.getValue()
      localStorage.setItem('userCartItems',this._CartService.noOfItems.getValue())
  })


  }
  logOut()
  {
    localStorage.removeItem("userToken");
    this._AuthontcationService.SaveData();
    this._Router.navigate(["/login"]);
    
  }
}
