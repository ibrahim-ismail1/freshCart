import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import {product} from '../iproducts';
import { DisplayingService } from '../displaying.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  searchText:string=''
  allProduct!:product[];
  fillterProduct!:any[];
  proId!:string;
  wishListIds:any[]=[];
 
  constructor(private _ProductsService:ProductsService
    ,private _CartService:CartService,private _DisplayingService:DisplayingService){}
  ngOnInit(): void {
    
    localStorage.setItem('currentPage','/products')
      this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          this.allProduct=res.data;
          this.search()
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      this._DisplayingService.getWishList().subscribe({
        next:(res)=>{
            const newWish=res.data.map( (item:any)=>item._id)
            this.wishListIds=newWish;
        }
        ,
        error:(err)=>{

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
    search()
    {
      this.fillterProduct= this.searchText===''? this.allProduct : this.allProduct.filter((element)=>{
        
        
        return element.title.toLowerCase().includes(this.searchText.toLowerCase())
      
      })
      
      
    }
    AddWishlist(pId:any){
      this._DisplayingService.AddWishList(pId).subscribe({
        next:(res)=>{
          console.log(res);
        this.wishListIds=res.data;
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    deleteItemFromWhis(pId:any){
      this._DisplayingService.removeItemWishList(pId).subscribe({
        next:(res)=>{
          console.log(res);
          this.wishListIds=res.data;
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    getWishlist(){
      this._DisplayingService.getWishList().subscribe({
        next:(res)=>{
          console.log(res);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    
  
    
}
