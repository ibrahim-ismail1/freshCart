import { Component } from '@angular/core';
import { DisplayingService } from '../displaying.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  constructor(private _DisplayingService:DisplayingService){}
  allbrands!:any[];
  ngOnInit(): void {
    localStorage.setItem('currentPage','/brands')
      
    
    this._DisplayingService.getAllBrands().subscribe({
      next:(res)=>{
        this.allbrands=res.data;
      },
      error:(err)=>{
        alert(err.statusMsg)
      }
    })

      
    }

}
