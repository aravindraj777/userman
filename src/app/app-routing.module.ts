import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { MenuheaderComponent } from './components/shared/menuheader/menuheader.component';
import { RegisterFormComponent } from './components/shared/register/register-form.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';
import { HomeComponent } from './components/user/home/home.component';

import { AuthService } from './services/auth/auth.service';
import { authGuard } from './Guards/auth.guard';
import { loginGuard } from './Guards/login.guard';



const routes: Routes = [
  {path:"",component:LoginComponent,canActivate:[loginGuard]},
  {path:"register",component:RegisterFormComponent,canActivate:[loginGuard]},
  {path:"adminhome",component:AdminHomeComponent,canActivate:[authGuard]},
  {path:"adminhome/user-list",component:UserlistComponent,canActivate:[authGuard]},
  {path:"userhome",component:HomeComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
