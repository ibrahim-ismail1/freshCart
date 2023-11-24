import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  allCartProduct!:any;
  totalPrice!:number;
  ItemsNo!:string;
  cartId!:string;
  
  constructor(private _CartService:CartService){}
  ngOnInit(): void {
    localStorage.setItem('currentPage','/cart');
    
    this._CartService?.GetAllCart().subscribe({
      next:(res)=>{
        localStorage.setItem('ownerId',res.data.cartOwner)
       this.allCartProduct=res.data.products;
       this.totalPrice=res.data.totalCartPrice;
       this._CartService.noOfItems.next(res.numOfCartItems)
       this.cartId=res.data._id;
       this._CartService.noOfItems.subscribe(()=>{
        
        this.ItemsNo=this._CartService.noOfItems.getValue()
        
        
        
    }) 
  },
      error:(err)=>{
        console.log(err);
        
      }
      
    })

 }
 RemoveItem(pId:string):void
 {
  this._CartService.DeleteSpecItem(pId).subscribe({
    next:(res)=>{
      this.allCartProduct=res.data.products;
      this._CartService.noOfItems.next(res.numOfCartItems);
      this.totalPrice=res.data.totalCartPrice;
    },
    error:(err)=>{
      console.log(err);
      
    }
  
  })
 }
 UpdateCounts(pId:string , pCounts:number)
 {
  if(pCounts==0)
  {
    this.RemoveItem(pId);
    return;
  }
  this._CartService.UpDateCounts(pId,pCounts).subscribe({
   next:(res)=>{
    this.allCartProduct=res.data.products;
    this.totalPrice=res.data.totalCartPrice;
   },
   error:(err)=>{
    console.log(err);
    
   }
  })
 }
 RemoveAllCart()
 {
  this._CartService.DeleteAllCart().subscribe({
    next:(res)=>{ 
      this.allCartProduct=[]
      this._CartService.noOfItems.next(0)
      this.totalPrice=0;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 }



}
