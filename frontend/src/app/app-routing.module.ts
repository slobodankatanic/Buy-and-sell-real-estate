import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddAgencyComponent } from './admin-add-agency/admin-add-agency.component';
import { AdminAddMicrolocationComponent } from './admin-add-microlocation/admin-add-microlocation.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminDeleteMicrolocationComponent } from './admin-delete-microlocation/admin-delete-microlocation.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { AdvertiserAddJSONComponent } from './advertiser-add-json/advertiser-add-json.component';
import { AdvertiserAddRealEstateComponent } from './advertiser-add-real-estate/advertiser-add-real-estate.component';
import { AdvertiserRealEstateListComponent } from './advertiser-real-estate-list/advertiser-real-estate-list.component';
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

  // advertiser
  { path: 'advertiser/home', component: AdvertiserRealEstateListComponent },
  { path: 'owner/home', redirectTo: 'advertiser/home', pathMatch: 'full' },
  { path: 'agent/home', redirectTo: 'advertiser/home', pathMatch: 'full' },
  { path: 'advertiser/addRealEstate', component: AdvertiserAddRealEstateComponent },
  { path: 'advertiser/addRealEstateJSON', component: AdvertiserAddJSONComponent },

  // admin
  { path: 'admin/home', component: AdminRequestComponent },
  { path: 'admin/addUser', component: AdminAddUserComponent },
  { path: 'admin/editDeleteUser', component: AdminEditUserComponent },
  { path: 'admin/addAgency', component: AdminAddAgencyComponent },
  { path: 'admin/addMicrolocation', component: AdminAddMicrolocationComponent },
  { path: 'admin/deleteMicrolocation', component: AdminDeleteMicrolocationComponent },

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
