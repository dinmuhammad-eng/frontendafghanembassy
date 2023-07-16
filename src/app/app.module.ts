import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { AuthIntercepterInterceptor } from './auth-intercepter.interceptor';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { Page3Component } from './page3/page3.component';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogPopupComponent } from './dialog-popup/dialog-popup.component';
import { VerificationPasswordComponent } from './verification-password/verification-password.component';
import { DateFormatPipe } from './date-format.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    Page1Component,
    Page2Component,
    HomeComponent,
    UpdateComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    Page3Component,
    DialogPopupComponent,
    VerificationPasswordComponent,
    DateFormatPipe,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatDialogModule,
  ],
  providers: [
    {
      // this can be effect on rechapa
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
