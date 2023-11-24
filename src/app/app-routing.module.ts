import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductDeatilsComponent } from './product-deatils/product-deatils.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AllordersComponent } from './allorders/allorders.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:'full'},
  {path:'home',component:HomeComponent, canActivate:[authGuard]},
  {path:'categories',component:CategoriesComponent ,canActivate:[authGuard]},
  {path:'cart',component:CartComponent ,canActivate:[authGuard]},
  {path:'brands',component:BrandsComponent ,canActivate:[authGuard]},
  {path:'products',component:ProductsComponent ,canActivate:[authGuard]},
  {path:'login',component:LoginComponent} ,
  {path:'register',component:RegisterComponent} ,
  {path:'productDeatils/:DeatilsId' , component:ProductDeatilsComponent ,canActivate:[authGuard]}, 
  {path:'CheckOut/:cartId' , component:CheckOutComponent ,canActivate:[authGuard]},
  {path:'allorders' , component:AllordersComponent ,canActivate:[authGuard]},
  {path:'whishlist' , component:WishlistComponent ,canActivate:[authGuard]},
  {path:'**',component:NotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
