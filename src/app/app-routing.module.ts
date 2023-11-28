import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { MenuheaderComponent } from './components/shared/menuheader/menuheader.component';
import { RegisterFormComponent } from './components/shared/register/register-form.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"register",component:RegisterFormComponent},
  {path:"adminhome",component:AdminHomeComponent},
  {path:"adminhome/user-list",component:UserlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
