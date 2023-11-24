import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  noOfItems:BehaviorSubject<any>=new BehaviorSubject(localStorage.getItem('userCartItems'))
  baseUrl:string='https://ecommerce.routemisr.com';
  header:any={token:localStorage.getItem('userToken')!};
  constructor(private _HttpClient:HttpClient) {
   
    
   }
  AddToCart(pId:string):Observable<any>
  {
    let body:any={productId:pId}
   return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,body,{
      headers:this.header
    })
  }
  UpDateCounts(pId:string,pCounts:number):Observable<any>
  {
    let body:any={count:pCounts}
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${pId}`,body ,{
      headers:this.header
    })
  }
  GetAllCart():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,{headers:this.header})
  }
  DeleteSpecItem(pId:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${pId}`,{
      headers:this.header
    })
  }
  DeleteAllCart():Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`,{
      headers:this.header
    })
  }
}
