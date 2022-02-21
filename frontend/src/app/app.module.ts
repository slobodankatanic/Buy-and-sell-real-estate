import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BuyerComponent } from './buyer/buyer.component';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { ChangePasswordComponent } from './change-password/change-password.component';
import { RealestateComponent } from './realestate/realestate.component';
import { FavoriteRealEstateComponent } from './favorite-real-estate/favorite-real-estate.component';
import { HomeComponent } from './home/home.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminAddAgencyComponent } from './admin-add-agency/admin-add-agency.component';
import { AdminAddMicrolocationComponent } from './admin-add-microlocation/admin-add-microlocation.component';
import { AdminDeleteMicrolocationComponent } from './admin-delete-microlocation/admin-delete-microlocation.component';
import { AdvertiserRealEstateListComponent } from './advertiser-real-estate-list/advertiser-real-estate-list.component';
import { AdvertiserAddRealEstateComponent } from './advertiser-add-real-estate/advertiser-add-real-estate.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BuyerComponent,
    ChangePasswordComponent,
    RealestateComponent,
    FavoriteRealEstateComponent,
    HomeComponent,
    AdminRequestComponent,
    AdminAddUserComponent,
    AdminEditUserComponent,
    AdminAddAgencyComponent,
    AdminAddMicrolocationComponent,
    AdminDeleteMicrolocationComponent,
    AdvertiserRealEstateListComponent,
    AdvertiserAddRealEstateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
