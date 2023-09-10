import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string = '';
  token: string = '';
  constructor(private http: HttpClient) { }
  private tokenKey = 'token';
 


  getUserType(): string {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      const tokenPayload = this.decodeToken(token);
      if (tokenPayload && tokenPayload.role) {
        return tokenPayload.role;
      }
    }

    return '';
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken;
  }
  getUserId(): string {
    return localStorage.getItem('userId') || ''; // Retrieve the user ID from local storage
  }
  
  setUserId(userId: string): void {
    localStorage.setItem('userId', userId); // Save the user ID to local storage
  }
  getcategoryId():any {
    return localStorage.getItem('categoryId') || '';
  }
  setcategoryId(categoryId:string):void{
    localStorage.setItem('categoryId',categoryId)
  }
  
  saveUsercat(data: any): Observable<any> {
    console.log('Data:', data);
    return this.http.post("http://localhost:8080/category/add", data);
  }
  

  saveUser(data: any): Observable<any> {
    return this.http.post("http://localhost:8080/user/signup", data);
  }

  saveUserVerification(data: any): Observable<any> {
    return this.http.post("http://localhost:8080/user/verified", data);
  }
  

  saveLogin(data: any): Observable<any> {
    return this.http.post("http://localhost:8080/user/login", data);
  }
  forgetPassword(email: string): Observable<any> {
    return this.http.post("http://localhost:8080/user/forgotPassword", { email });
  }
  getUser(page: number, perPage: number): Observable<any> {
    // Create HttpParams and append page and perPage parameters to it
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('perPage', perPage.toString());

    // Use params in the API request
    return this.http.get<any>('http://localhost:8080/user/get', { params });
  }

  getUserrecord(): Observable<any> {

    return this.http.get("http://localhost:8080/category/get");
  }
  
  //page2
  // saveUsercat2(data: any): Observable<any> {
  //   return this.http.post("http://localhost:8080/category2/add", data);
  // }

  setToken(token: string){
      this.token = token
  }

  deleteStudent(id: string) {
    return this.http.delete(`http://localhost:8080/category/delete/${id}`);
  }
  //update
  
  getTheId(id:any){
    return this.http.get(`http://localhost:8080/category/search/${id}`);
  }
  
  update(id:any, datas:any){
    return this.http.put(`http://localhost:8080/category/update/${id}`, datas);
  }
  getByName(name: string) {
    return this.http.get(`http://localhost:8080/category/searchByName/${name}`);
  }
 

  resetPassword(email: string, data: any) {
    return this.http.put(`http://localhost:8080/user/resetPassword/${email}`, data);
  }
  
  saveUserWithImage(occupation:any,employeer:any,employeerAddrees:any,previousEmplyeer:any,previousEmplyeerAddress:any,passportType:any,jobTitle:any,havePassport:any, previousPassport:any, issueDate:any, expiryDate:any,haveCriminal:any, passportDetails:any,userId: any,categoryId:any,file: File,docxFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('docx', docxFile, docxFile.name);
    formData.append('image', file, file.name);
    formData.append('occupation', occupation);
    formData.append('employeer', employeer);
    formData.append('employeerAddrees', employeerAddrees);
    formData.append('previousEmplyeer', previousEmplyeer);
    formData.append('previousEmplyeerAddress', previousEmplyeerAddress);
    
    
    formData.append('passportType', passportType);
    formData.append('jobTitle', jobTitle);
    formData.append('havePassport',  havePassport);
   
    formData.append('previousPassport', previousPassport);
    formData.append('issueDate', issueDate);
    formData.append('expiryDate', expiryDate);
    formData.append('haveCriminal', haveCriminal);
    formData.append('passportDetails', passportDetails);
    formData.append('userId', userId);
    formData.append('categoryId',categoryId);

    
    
    
    return this.http.post('http://localhost:8080/category2/add', formData);
  }

  getTheIdof(id:any):Observable<any>{
    return this.http.get(`http://localhost:8080/category/searchIdof/${id}`);
  }

  getTheIdofthirdpage(id:any):Observable<any>{
    return this.http.get(`http://localhost:8080/user/searchIdofidthird/${id}`);
  }
  
}