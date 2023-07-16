import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  loginForm: FormGroup;
  
  successMessage: any;
  errorMessage: any;
  passwordVisible: boolean = false;
  

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    

    const formData = this.loginForm.value;

    this.userService.saveLogin(formData)
      .subscribe(
        (response: any) => {
          console.log('Logged in');
          localStorage.setItem('token', response.token);
          this.loginForm.reset();
          this.successMessage = 'Logged in successfully';
          this.errorMessage = '';
          this.isLoading = true; // Show the loader

          const userId = response.userId; // Assuming the user ID is returned in the response
          this.userService.setUserId(userId); // Store the user ID in the service and save it to local storage
          
          setTimeout(() => {
            this.router.navigate(['/page1']);
          }, 500);
        },
        (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Incorrect email or password!';
          this.successMessage = '';

          // Increment the login attempts
          
        }
      );
  }


  navigateToResetPassword() {
    this.isLoading = true; // Show the loader
    setTimeout(() => {
      this.router.navigate(['/reset-password']);
    }, 500);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  
  
}
