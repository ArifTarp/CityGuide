import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { LoginUser } from "../models/loginUser";
import { RegisterUser } from '../models/registerUser';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  navbarOpen = false;
  loginUser = new LoginUser();
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  login() {
    this.authService.login(this.loginUser);
  }

  logOut() {
    this.authService.logOut();
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
