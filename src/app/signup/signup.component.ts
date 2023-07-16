import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  signupForm: FormGroup;
  successMessage: any;
  errorMessage: any;
  errorMessages: any;
  passwordVisible: boolean = false;
  passwordVisibles: boolean = false; // Variable to track password visibility

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signupForm = this.fb.group({
      email: [''],
      password: ['', [Validators.required, Validators.minLength(2)]],
      confirmPassword: ['', [Validators.required]],
      recaptchaReactive: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    const email = this.route.snapshot.queryParamMap.get('email');
    console.log("this is the eamil ",email)
    this.signupForm.patchValue({ email: email ? email : '' });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMatch: true };
  }

  signup() {
    const formData = this.signupForm.value;
    const email = formData.email;
  
    if (!email) {
      this.errorMessage = 'Email is required';
      return;
    }
  

    this.userService.saveUser(formData).subscribe(
      () => {
        console.log('Data sent to backend successfully');
        this.signupForm.reset();
        this.successMessage = 'You have signed up! Please proceed to';
        this.errorMessage = ''; // Clear any previous error message
      },
      (error) => {
        console.error('Error occurred while saving data:', error);
        this.successMessage = ''; // Clear any previous success message
        if (error.status === 400 && error.error.message === 'Email already exists') {
          this.errorMessages = 'You have already signed up. Please';
        }
        else {
          this.errorMessage = 'An error occurred while registering. Please try again later.';
        }
      }
    );
  }

  navigateToResetPassword() {
    this.isLoading = true; // Show the loader

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500)
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordVisibilityofcon() {
    this.passwordVisibles = !this.passwordVisibles;
  }
}
