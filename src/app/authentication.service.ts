import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  private loggedIn = false;

  constructor() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
