import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import {product} from '../iproducts'
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {
  AllProduct!:product[]
  constructor(private _ProductsService:ProductsService , private _CartService:CartService ){}
  ngOnInit(): void {
  localStorage.setItem('currentPage','/home')
    document.querySelector('.modal-backdrop')?.remove()
    document.body.classList.add('overflowY-auto')

    
    
      this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          this.AllProduct=res.data;
         
        },
        error:(err)=>{
          console.log(err);
          
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
