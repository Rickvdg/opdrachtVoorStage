import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthenticationService) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true; // continue to routed component
    } else {
      // Go to catalog page if the user is not logged in
      this.router.navigate(['/catalog']);
      // abort current navigation
      return false;
    }
  }

}
