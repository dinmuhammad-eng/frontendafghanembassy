import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable()
export class AuthIntercepterInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const userId = this.userService.getUserId(); // Retrieve the user ID from the service
    const categoryId = this.userService.getcategoryId();
    
    const modifiedHeaders = {
      Authorization: `Bearer ${token}`,
      'X-User-ID': userId // Add the user ID as a custom header
    };
    const modifiedRequest = request.clone({ setHeaders: modifiedHeaders });
    return next.handle(modifiedRequest);
  }
}
