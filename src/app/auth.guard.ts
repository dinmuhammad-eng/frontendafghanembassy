import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean {
    const token = localStorage.getItem('token') 
    if (token) {
      return true;
    } else {
      // Redirect to login page or any other appropriate route
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
