import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  successMessage: any;
  isLoading: boolean = false;
  email: string = '';
  password: string = '';
  passwordChanged: boolean = false; // Variable to track password change status

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  changePassword() {
    if (this.password === '') {
      return;
    }
  
    const data = { password: this.password }; // Create an object with the password value
  
    this.userService.resetPassword(this.email, data).subscribe(
      (res) => {
        console.log(res);
        this.passwordChanged = true; // Set passwordChanged to true on success
        this.successMessage = 'Password reset. Please proceed to';
        
      },
      (error) => {
        console.error(error);
        // Handle error response if needed
      }
    );
  }
  navigateToResetPassword() {
    this.isLoading = true; // Show the loader

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500)
    
  }
}
