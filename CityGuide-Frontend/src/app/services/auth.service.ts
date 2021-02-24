import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router } from '@angular/router';

import { LoginUser } from "../models/loginUser";
import { RegisterUser } from "../models/registerUser";
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  path = "https://localhost:44343/api/auth/";
  userToken:any;
  decodedToken:any;
  jwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService, private router: Router) {}

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");   
    this.httpClient.post(this.path + "login", loginUser, { headers: headers }).subscribe(data => {
      this.saveToken(data.toString())
      this.userToken = data
      this.decodedToken = this.jwtHelper.decodeToken(data.toString())     
      this.alertifyService.success("Login Successful...")
      this.router.navigateByUrl("/city")
    });
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "register", registerUser, { headers: headers }).subscribe(data => {
      
    });
    this.alertifyService.success("Registered Successful...");
    this.router.navigateByUrl("/city")
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY)
    this.alertifyService.warning("Sign Out Successful...")
    this.router.navigateByUrl("/city")
  }

  loggedIn(){
    return tokenNotExpired(this.TOKEN_KEY)
  }

  getCurrentUserId(){
    return this.jwtHelper.decodeToken(this.token).nameid
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY)
  }
}
