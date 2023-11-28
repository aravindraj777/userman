import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdduserComponent } from './components/admin/adduser/adduser.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { RegisterFormComponent } from './components/shared/register/register-form.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MenuheaderComponent } from './components/shared/menuheader/menuheader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserlistComponent } from './components/admin/userlist/userlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AdminHomeComponent,
    AdduserComponent,
    EditUserComponent,
    RegisterFormComponent,
    LoginComponent,
    MenuheaderComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
