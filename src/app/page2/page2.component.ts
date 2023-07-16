import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {
  havePassportValue: any;
  haveCriminalValue: any;
  isLoading: boolean = false;
  language: string = 'english';
  userType: any;
  loginForm: FormGroup;
  selectedFile: File | null = null;
  selectedDocxFile: File | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  Passports: string[] = ['ordinary', 'diplomatic', 'service', 'special', 'passport'];

  constructor(private fb: FormBuilder, private serverService: UserService, private route: Router) {
    this.loginForm = this.fb.group({
      
      occupation: ['', Validators.required],
      employeer: ['', Validators.required],
      employeerAddrees:['', Validators.required],
      previousEmplyeer:[''],
      previousEmplyeerAddress:[''],

      passportType: ['', Validators.required],
      jobTitle: [''],
      havePassport: ['', Validators.required],
      previousPassport: [''],
      issueDate: [''],
      expiryDate: [''],
      haveCriminal: ['', Validators.required],
      passportDetails: ['']
    });
  }

  updateValidation() {
    const passportDetailsControl = this.loginForm.get('passportDetails');
    const previousPassportControl = this.loginForm.get('previousPassport');
    const issueDateControl = this.loginForm.get('issueDate');
    const expiryDateControl = this.loginForm.get('expiryDate');
    const jobTitleControl = this.loginForm.get('jobTitle');
  
    if (passportDetailsControl) {
      if (this.loginForm.get('haveCriminal')?.value === 'yes') {
        passportDetailsControl.setValidators([Validators.required]);
      } else {
        passportDetailsControl.clearValidators();
      }
      passportDetailsControl.updateValueAndValidity();
    }
  
    if (this.loginForm.get('havePassport')?.value === 'yes') {
      previousPassportControl?.setValidators([Validators.required]);
      issueDateControl?.setValidators([Validators.required]);
      expiryDateControl?.setValidators([Validators.required]);
      if (this.loginForm.get('passportType')?.value === 'diplomatic' || this.loginForm.get('passportType')?.value === 'service') {
        jobTitleControl?.setValidators([Validators.required]);
      } else {
        jobTitleControl?.clearValidators();
      }
    } else {
      previousPassportControl?.clearValidators();
      issueDateControl?.clearValidators();
      expiryDateControl?.clearValidators();
      jobTitleControl?.clearValidators();
    }
  
    previousPassportControl?.updateValueAndValidity();
    issueDateControl?.updateValueAndValidity();
    expiryDateControl?.updateValueAndValidity();
    jobTitleControl?.updateValueAndValidity();
  }
  
 
  


  login() {

    const occupation = this.loginForm.get('occupation')?.value;
    const employeer = this.loginForm.get('employeer')?.value;
    const employeerAddrees = this.loginForm.get('employeerAddrees')?.value;
    const previousEmplyeer = this.loginForm.get('previousEmplyeer')?.value;
    const previousEmplyeerAddress = this.loginForm.get('previousEmplyeerAddress')?.value;
    
    //
    const passportType = this.loginForm.get('passportType')?.value;
    const jobTitle = this.loginForm.get('jobTitle')?.value;
    const havePassport = this.loginForm.get('havePassport')?.value;
    const previousPassport = this.loginForm.get('previousPassport')?.value;
    const issueDate = this.loginForm.get('issueDate')?.value;
    const expiryDate = this.loginForm.get('expiryDate')?.value;
    const haveCriminal = this.loginForm.get('haveCriminal')?.value;
    const passportDetails = this.loginForm.get('passportDetails')?.value;

    const userId = this.serverService.getUserId();
    console.log("this is the id",userId)
    const categoryId = this.serverService.getcategoryId();
    console.log("this is the category id ",categoryId);
    if (this.selectedFile && this.selectedDocxFile && occupation && employeer && employeerAddrees && (previousEmplyeer !== null || previousEmplyeer !== undefined) && (previousEmplyeerAddress !== null || previousEmplyeerAddress !== undefined) && passportType &&  (jobTitle !== null || jobTitle !== undefined)&& havePassport && (previousPassport !== null || previousPassport !== undefined) &&  (issueDate !== null || issueDate !== undefined) && (expiryDate !== null || expiryDate !== undefined)  && haveCriminal && (passportDetails !== null || passportDetails !== undefined) && userId && categoryId) {
      this.serverService.saveUserWithImage(occupation, employeer, employeerAddrees, previousEmplyeer, previousEmplyeerAddress, passportType, jobTitle, havePassport, previousPassport, issueDate, expiryDate, haveCriminal, passportDetails,userId,categoryId, this.selectedFile,this.selectedDocxFile)
        .subscribe(() => {
          console.log('Data sent to backend successfully');
          this.loginForm.reset();
          this.isLoading = true; // Show the loader

          setTimeout(() => {
            this.route.navigate(['/page3']);
          }, 500)


          this.successMessage = 'Data submitted successfully.';
          this.errorMessage = null;
        }, (error: any) => { // Specify the type of error parameter as 'any'
          console.error(error);
          this.successMessage = null;
          this.errorMessage = 'Error submitting data.';
        });
    } else {
      this.errorMessage = 'Missing the image or the file, please attach to sumbit !';
      this.successMessage = null;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  

  getObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }
  onDocxFileSelected(event: any) {
    this.selectedDocxFile = event.target.files[0];
  }
  
  getDocxObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }
  
  
}
