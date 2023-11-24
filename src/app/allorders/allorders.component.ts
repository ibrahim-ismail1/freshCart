import { Component } from '@angular/core';
import { CheckingOutService } from '../checking-out.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent {
  constructor(private _CheckingOutService:CheckingOutService){
    localStorage.setItem('isCridet','true')
  }
  allOeders!:any[];
  cartItms!:any[]
  ngOnInit(): void {
    localStorage.setItem('currentPage','/allorders')
    
    let cartId:string=localStorage.getItem('ownerId')!;
    this._CheckingOutService.getAllOrders(cartId).subscribe({
      next:(res)=>{
        this.allOeders=res;
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

}
