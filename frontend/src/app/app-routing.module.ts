import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from './buyer/buyer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'buyer/home', component: BuyerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
