import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthontcationService {
  userDataToken:BehaviorSubject<any>=new BehaviorSubject(null)

  baseurl:string='https://ecommerce.routemisr.com'
  OwnerId!:string;

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 
    if(localStorage.getItem('userToken')==null)
    {
      this._Router.navigate(['login'])
    }
    else if( localStorage.getItem('currentPage')=='/cart' && localStorage.getItem('isCridet')=='true')
    {
      this.SaveData()
      this._Router.navigate(['allorders'])
      localStorage.setItem('isCridet','false')
    }
    else{
      this.SaveData()
      this._Router.navigate([localStorage.getItem('currentPage')])
    }


 }

  SendRegister(registerData:any):Observable<any>
  {
    return this._HttpClient.post(this.baseurl+'/api/v1/auth/signup',registerData)
  }
  SendLogin(loginData:any):Observable<any>
  {
    return this._HttpClient.post(this.baseurl+'/api/v1/auth/signin',loginData)
  }
  SaveData(){

    this.userDataToken.next(localStorage.getItem('userToken'));
    if(this.userDataToken.getValue()!=null){
    this.userDataToken.next(jwtDecode(this.userDataToken.getValue()));
    localStorage.setItem('ownerId',this.userDataToken.getValue().id)

    
    
    }
  }
  SendEmailVer(eFr:any):Observable<any>
  {
    return this._HttpClient.post(this.baseurl+'/api/v1/auth/forgotPasswords',eFr)
  }
  SendVerifaction(rCo:any):Observable<any>{
    return this._HttpClient.post( this.baseurl+'/api/v1/auth/verifyResetCode',rCo)
  }
  SendNewPass(rP:any):Observable<any>
  {
    return this._HttpClient.put(this.baseurl+'/api/v1/auth/resetPassword',rP)
  }
}
