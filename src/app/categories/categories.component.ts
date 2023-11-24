import { Component } from '@angular/core';
import { DisplayingService } from '../displaying.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  allCategories!:any[];
  constructor(private _DisplayingService:DisplayingService){}
  ngOnInit(): void {
    localStorage.setItem('currentPage','/categories')
    this._DisplayingService.getAllCategory().subscribe({
      next:(res)=>{
        this.allCategories=res.data;
      },
      error:(err)=>{
        alert(err.statusMsg)
      }
    })
    }

}
