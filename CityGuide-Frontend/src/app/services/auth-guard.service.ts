import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  userLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    this.userLoggedIn = this.authService.loggedIn();
    if (this.userLoggedIn) {
     return true;
    } else {
      this.router.navigateByUrl('/cities');
     return false;
    }
  }
}
