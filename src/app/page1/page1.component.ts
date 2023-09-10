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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalCount: number = 0;
  totalPages: number = 0;
  language: string = 'english';
  isLoading: boolean = false;
  userData: any;
  userDataSearch:any;
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
      cnic: ['', Validators.required],
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
      mobileAddress: ['',Validators.required]
      
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
    this.getUserData(this.currentPage, this.itemsPerPage);
  }

  getUserData(page: number, perPage: number) {
    this.userService.getUser(page, perPage).subscribe(
      (response: any) => {
        this.userData = response.data;
        this.totalCount = response.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage); // Calculate the total number of pages
        console.log('User data retrieved:', this.userData);
        console.log('Calculated totalPages:', this.totalPages);
        console.log("total record : ",this.totalCount)

      console.log('User data retrieved:', this.userData);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getUserData(this.currentPage, this.itemsPerPage);
    console.log('Current Page:', this.currentPage);
  }

  getPaginationArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  
  onSearch(): void {
    const id = this.loginForm.value.id;
    this.userService.getTheIdof(id).subscribe((res: any) => {
      this.userDataSearch = res.data ? res.data : [];
      console.log('Response from backend:', res);
    });
  }
  
  
  
  

  
    login() {
      if (Page1Component.loginAttempts >= 2) {
        console.log('Maximum login limit exceeded. Please try again later.');
        this.exeeded = 'Only 100 inividuals are to be registered to fill the form so here the limitiation is done and you should try tommarrow ! thank you ';
  
        return;
      }
      const formData = this.loginForm.value;
  const storedToken = localStorage.getItem('token'); 
  const storedUserId = localStorage.getItem('userId'); 
  console.log("Stored User ID:", storedUserId);
  
  if (storedUserId) {
    formData.userId = storedUserId; 
    console.log("very nice ",formData.userId);
  }

  this.userService.saveUsercat(formData).subscribe((res:any) => {
    console.log('Data sent to backend successfully');
    const categoryId = res.categoryId; 
    this.userService.setcategoryId(categoryId)
    this.loginForm.reset();
    this.isLoading = true; 
    Page1Component.loginAttempts++; 
          console.log("this is fine",Page1Component.loginAttempts)

    setTimeout(() => {
      this.route.navigate(['/page2']);
    }, 500);
  });
}
    

  // deleteStudent(id: string) {
  //   this.userService.deleteStudent(id).subscribe((response: any) => {
  //     console.log(response.message);
  //     this.getUserData();
  //   });
  // }
}
