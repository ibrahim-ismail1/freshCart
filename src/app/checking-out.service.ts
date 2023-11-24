import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckingOutService {

  baseUrl:string='https://ecommerce.routemisr.com';
  header:any=localStorage.getItem('userToken');
  constructor( private _HttpClient:HttpClient) { }
  CashSend(Cid:string , cF:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/${Cid}`,{shippingAddress:cF},
    {headers:{token:this.header}})
  }
  CridetSend(Cid:string , cF:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${Cid}?url=http://localhost:4200`,{shippingAddress:cF},
    {headers:{token:this.header}})
  }
  getAllOrders(cId:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${cId}`)
  }
}
