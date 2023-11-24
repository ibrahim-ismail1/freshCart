import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DisplayingService {
  
  baseurl:string='https://ecommerce.routemisr.com'
  header:any={token:localStorage.getItem('userToken')!};

  constructor(private _HttpClient:HttpClient) { }
  getAllBrands():Observable<any>
  {
    return this._HttpClient.get(`${this.baseurl}/api/v1/brands`)
  }
  getAllCategory():Observable<any>
  {
    return this._HttpClient.get(`${this.baseurl}/api/v1/categories`)
  }
  AddWishList(pId:string):Observable<any>
  {
    return this._HttpClient.post(`${this.baseurl}/api/v1/wishlist`,{productId:pId},{
      headers:this.header
    })
  }
  removeItemWishList(pId:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseurl}/api/v1/wishlist/${pId}`,{
      headers:this.header
    })
  }
  getWishList():Observable<any>
  {
    return this._HttpClient.get(`${this.baseurl}/api/v1/wishlist`,{
      headers:this.header
    })
  }
}
