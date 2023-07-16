import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  language: string = 'english';
  isLoading: boolean = false;
  userData: any;
  loginForm: FormGroup;
  userType: string;
  static loginAttempts: number = 0; // Track the number of login attempts for all users
  exeeded:any;
  materialStats: string[] = ['single','engaged','married','divorced','separated','widow'];
  
  genders: string[] = ['male', 'female','unknown'];
  childs:string[] =['yes','no']
  haircolors: string[] = ['black','blonde','brown','red','grey','brunette'];
  eyecolors: any[] = ['blue','brown','green','grey','hazel','other'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private elementRef: ElementRef
  ) {
    this.userType = this.userService.getUserType();
    this.loginForm = this.fb.group({
      id: [''],
      name: ['', Validators.required, Validators.pattern('[a-zA-Z\s]+'),Validators.maxLength(50)],
      Pname: ['', Validators.required , Validators.pattern('[\u0600-\u06FF\s]+'),Validators.maxLength(50)],

      lastName: ['', Validators.required,Validators.pattern('[a-zA-Z\s]+'),Validators.maxLength(50)],
      PlastName: ['', Validators.required, Validators.pattern('[\u0600-\u06FF\s]+'),Validators.maxLength(50)],
      
      
      fatherFulName: ['', Validators.required,Validators.maxLength(70)],

      grandFatherName: ['', Validators.required,Validators.maxLength(70)],
      familyName: ['', Validators.required,Validators.maxLength(70)],
      cnic: ['', Validators.required,Validators.maxLength(10)],
      dob: ['', [Validators.required, Validators.pattern('^(?:\\d{1,2}[-./]\\d{1,2}[-./]\\d{4})$')]],
      Pdob: ['', [Validators.required, Validators.pattern('^(?:[0-9۰-۹]{1,2}[-./][0-9۰-۹]{1,2}[-./][0-9۰-۹]{4})$')]],
      placeOfBirth: ['', Validators.required],
      country: ['', Validators.required],

      province: ['', Validators.required],
      district: ['', Validators.required],
      village: ['', Validators.required],
      countryofResidence:['',Validators.required],
      otherNationalities:['', Validators.required],

      materialStatus: ['', Validators.required],
      gender: ['',Validators.required],
      children: ['',Validators.required],
      hieght:['', Validators.required],
     
      
      
      
      hairColurs:['', Validators.required],

      eyeColor:['', Validators.required],
      currentAddress:['', Validators.required],
      previousAddress:['', Validators.required],
      emailAddress:['', Validators.required],
      mobileAddress: ['',Validators.required, Validators.pattern(/^\d+$/)]
      
    });
  }
 
  formatDateInput(input: any) {
    const value = input.value;
  
    if (value) {
      const formattedValue = value.replace(/[^\d]/g, '');
  
      let day = formattedValue.substr(0, 2) || '';
      let month = formattedValue.substr(2, 2) || '';
      let year = formattedValue.substr(4, 4) || '';
  
      if (day.length >= 2) {
        day = day.substr(0, 2);
      }
  
      if (month.length >= 2) {
        month = month.substr(0, 2);
      }
  
      if (year.length > 4) {
        year = year.substr(0, 4);
      }
  
      let joinedValue = day;
  
      if (day.length === 2) {
        joinedValue += `/${month}`;
      }
  
      if (month.length === 2 ) {
        joinedValue += `/${year}`;
      }
  
      // Check if the last character entered is a slash and remove it
      if (input.value.length > 0 && input.value[input.value.length - 1] === '/') {
        joinedValue = joinedValue.slice(0, -1);
      }
  
      input.value = joinedValue;
    }
  }
  
//

  


  
  
  
  
  
  
  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUser().subscribe(
      (response: any) => {
        this.userData = response;
        console.log('User data retrieved:', this.userData);
      }
    );
  }

  onSearch(): void {
    const id = this.loginForm.value.id;
    this.userService.getTheIdof(id).subscribe((res: any) => {
      if (res.data) {
        const data = res.data;
        this.userData = {
          id: data['id'],
          cnic: data['cnic'],
          name: data['name'],
          familyName: data['familyName'],
          givenName: data['givenName'],
          fatherFulName: data['fatherFulName'],
          grandFatherName: data['grandFatherName'],
        
          births: data['births'],
          placeOfBirth: data['placeOfBirth'],
          country: data['country'],
          province: data['province'],
          district: data['district'],
          village: data['village'],

          materialStatus: data['materialStatus'],
          gender: data['gender'],
          children: data['children'],
          
          countryofResidence: data['countryofResidence'],
          otherNationalities: data['otherNationalities'],
          hieght: data['hieght'],
          hairColurs: data['hairColurs'],
          eyeColor: data['eyeColor'],
          othersDistangushing: data['othersDistangushing'],
          currentAddress: data['currentAddress'],
          previousAddress: data['previousAddress'],
          emailAddress: data['emailAddress'],
          mobileAddress: data['mobileAddress'],
          workTelephone: data['workTelephone'],
          fax: data['fax'],
          message: null
        };
      } else {
        this.userData = {
          id: null,
          message: 'The data you are searching for, was not found !'
        };
      }
    });
  }

  
    login() {
      if (Page1Component.loginAttempts >= 1) {
        // Display error message or redirect to a limit exceeded page
        console.log('Maximum login limit exceeded. Please try again later.');
        this.exeeded = 'Only 100 inividuals are to be registered to fill the form so here the limitiation is done and you should try tommarrow ! thank you ';
  
        return;
      }
      const formData = this.loginForm.value;
  const storedToken = localStorage.getItem('token'); // Retrieve the token from local storage
  const storedUserId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
  console.log("Stored User ID:", storedUserId);
  
  if (storedUserId) {
    formData.userId = storedUserId; // Add the user ID to the formData object
    console.log("very nice ",formData.userId);
  }

  this.userService.saveUsercat(formData).subscribe((res:any) => {
    console.log('Data sent to backend successfully');
    const categoryId = res.categoryId; // Assuming the user ID is returned in the response
    this.userService.setcategoryId(categoryId)
    this.loginForm.reset();
    this.isLoading = true; // Show the loader
    Page1Component.loginAttempts++; // Increment the login attempts for all users
          console.log("this is fine",Page1Component.loginAttempts)

    setTimeout(() => {
      this.route.navigate(['/page2']);
    }, 500);
  });
}
    

  deleteStudent(id: string) {
    this.userService.deleteStudent(id).subscribe((response: any) => {
      console.log(response.message);
      this.getUserData();
    });
  }
}
