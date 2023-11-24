import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import {product} from '../iproducts'
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-deatils',
  templateUrl: './product-deatils.component.html',
  styleUrls: ['./product-deatils.component.scss']
})
export class ProductDeatilsComponent {
  pId!:string;
  pInfo!:product;
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService,
    private _CartService:CartService){}
  ngOnInit():void
  {
    
    this.pId= this._ActivatedRoute.snapshot.params['DeatilsId']
    localStorage.setItem('currentPage',`/productDeatils/${this.pId}`)
    this._ProductsService.getSpecficProducts(this.pId).subscribe({
      next:(res)=>
      {
        this.pInfo=res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }
  AddCart()
  {
    this._CartService.AddToCart(this.pId).subscribe({
      next:(res)=>{
        alert(res.message)
        this._CartService.noOfItems.next(res.numOfCartItems)

      }
      ,
      error:(err)=>{
        console.log(err);
        
      }
      
    })
  }
}
