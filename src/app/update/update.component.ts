import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  userData: any;
  loginForm: FormGroup;
  userType: string;
  materialStats: any[] = [
    { name: 'Single', value: 'single' },
    { name: 'Engaged', value: 'engaged' },
    { name: "Married", value:'married'},
    { name: "Divorced", value:'divorced'},
    { name: "Separated", value:'separated'},
    { name: "Window/Windower", value:'window'},
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userType = this.userService.getUserType();
    this.loginForm = this.fb.group({
      cnic: ['', Validators.required],
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      givenName: ['', Validators.required],
      fatherFulName: ['', Validators.required],
      grandFatherName: ['', Validators.required],
      materialStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.warn(this.route.snapshot.params['id']);
    this.userService.getTheId(this.route.snapshot.params['id']).subscribe((res: any) => {
      const data = res.data;
      console.warn("this is fine", data);
      this.loginForm.patchValue({
        cnic: data['cnic'],
        name: data['name'],
        familyName: data['familyName'],
        givenName: data['givenName'],
        fatherFulName: data['fatherFulName'],
        grandFatherName: data['grandFatherName'],
        materialStatus: data['materialStatus']
      });
    });
  }

  logins() {
    this.userService.update(this.route.snapshot.params['id'], this.loginForm.getRawValue())
      .subscribe((res) => {
        console.log("done");
        this.router.navigate(['/page1']);
      });

    this.loginForm.reset();
  }
}
