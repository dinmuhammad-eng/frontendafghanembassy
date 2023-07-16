import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  emailForm: FormGroup;
  emailSent: boolean = false; // Variable to track email sending status

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword() {
    const email = this.emailForm.value.email;

    this.userService.forgetPassword(email)
      .subscribe(
        (response: any) => {
          console.log('Email sent successfully');
          this.emailSent = true; // Set emailSent to true on success
          // Handle success response if needed
        },
        (error: any) => {
          console.error('Error sending email:', error);
          // Handle error response if needed
        }
      );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const resetToken = params['token']; // Retrieve the token from the URL query parameters
      if (resetToken) {
        this.router.navigate(['/forget-password'], { queryParams: { token: resetToken } });
      }
    });
  }
}
