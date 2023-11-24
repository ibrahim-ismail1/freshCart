import { Component } from '@angular/core';
import { DisplayingService } from '../displaying.service';
import { BehaviorSubject } from 'rxjs';
import { product } from '../iproducts';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
allproduct!:product[]
newWish:any[]=[]
  constructor(private _DisplayingService:DisplayingService , private _CartService:CartService)
{}
ngOnInit()
{
  this._DisplayingService.getWishList().subscribe({
    next:(res)=>{
      this.allproduct=res.data;
      
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
RemoveItem(pId:string):void{

  this._DisplayingService.removeItemWishList(pId).subscribe({
    next:(res)=>{
      alert('removed succsefuly');
      this._DisplayingService.getWishList().subscribe({
        next:(res)=>{
          this.allproduct=res.data;
          
          
        }
      })
      
    },
    error:()=>{
      alert('not removed')
    }
  })
}

AddCart(pId:string):void
{
  this._CartService.AddToCart(pId).subscribe({
    next:(res)=>{
      alert(res.message)
      this._CartService.noOfItems.next(res.numOfCartItems)
      
     },
    error:(err)=>{
      console.log(err);
      
    }
    
  })
}
}

