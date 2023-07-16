import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verification-password',
  templateUrl: './verification-password.component.html',
  styleUrls: ['./verification-password.component.css']
})
export class VerificationPasswordComponent implements OnDestroy {
  signupForm: FormGroup;
  subscription: Subscription = new Subscription();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signup() {
    if (this.signupForm.invalid) {
      // Handle form validation errors, if any
      return;
    }

    const formData = this.signupForm.value;
    this.subscription = this.userService.saveUserVerification(formData).subscribe({
      next: () => {
        console.log('Data sent to backend successfully');
        this.signupForm.reset();
        this.successMessage = 'Email sent successfully. Please check and confirm !';
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Error occurred while saving data:', error);

        if (error.status === 400 && error.error.message === 'Email already exists') {
          this.successMessage = '';
          this.errorMessage = 'Email already exists. Please choose a different email.';
        } else {
          this.successMessage = '';
          this.errorMessage = 'An error occurred while registering. Please try again later.';
        }
      }
    });
  }
}
