import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from './buyer/buyer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FavoriteRealEstateComponent } from './favorite-real-estate/favorite-real-estate.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RealestateComponent } from './realestate/realestate.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // home
  { path: 'home', component: HomeComponent },

  // auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // buyer
  { path: 'buyer/home', component: BuyerComponent },
  { path: 'buyer/favorite', component: FavoriteRealEstateComponent },

  // realestate
  { path: 'realestate/details/:id', component: RealestateComponent },

  // change password
  { path: 'user/changePassword', component: ChangePasswordComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
