import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupComponent } from './singup/singup.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingAuthGuard } from './shopping-auth.guard';
import { MensProductComponent } from './mens-product/mens-product.component';
import { MobileComponent } from './mobile/mobile.component';

const routes: Routes = [
  { path: '' , redirectTo:'home' , pathMatch:'full'},
  { path: 'login', component: SingupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mens', component: MensProductComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'search/:query' , component: SearchComponent } ,
  { path:'cart' , component: CartComponent},
  {path: 'checkout' , component: CheckoutComponent , canActivate:[ShoppingAuthGuard]},
  {path: 'Eletronics' , component:MobileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
