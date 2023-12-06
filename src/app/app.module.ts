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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/shared/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { initialState } from './store/auth/auth.state';
import { AuthInterceptor } from './services/auth/interceptor/auth.interceptor';
import { authReducer } from './store/auth/auth.reducer';
import { _userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatOptionModule } from '@angular/material/core';



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
    UserlistComponent,
    ModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    StoreModule.forRoot({auth:authReducer,user:_userReducer}),
    EffectsModule.forRoot([AuthEffects,UserEffects])
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
