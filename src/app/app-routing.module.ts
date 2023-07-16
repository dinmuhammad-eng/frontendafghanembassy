import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Page3Component } from './page3/page3.component';
import { AuthGuard } from './auth.guard';
import { VerificationPasswordComponent } from './verification-password/verification-password.component';

const routes: Routes = [
  {
    component: SignupComponent,
    path:'signup'
  }
  ,
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:VerificationPasswordComponent,
    path:'verified'
  },
  {
    component:Page1Component,
    path:'page1', 
    canActivate:[AuthGuard]
  },
  {
    component:Page2Component,
    path:'page2',
    canActivate:[AuthGuard]
  },
  {
    component:UpdateComponent,
    path:'update/:id',
    canActivate:[AuthGuard]
  },
  {
    component: ForgetPasswordComponent,
    path: 'forget-password'    
  },
  {
    component:ResetPasswordComponent,
    path:'reset-password'
  },
  {
    component:HomeComponent,
    path:"",
  },
  {
    component:Page3Component,
    path:"page3",
    canActivate:[AuthGuard]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
