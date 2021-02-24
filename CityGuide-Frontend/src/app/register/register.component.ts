import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { RegisterUser } from '../models/registerUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private authService:AuthService) { }

  registerUser:RegisterUser;
  registerForm:FormGroup;

  ngOnInit() {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      userName:["",Validators.required],
      password:["",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:["",Validators.required]
    },
    {validator:this.passwordMatchValidator}
    )
  }

  // custom validator for reactive form
  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch:true}
  }

  register() {
    if(this.registerForm.valid){
      this.registerUser = Object.assign({},this.registerForm.value)      
      this.authService.register(this.registerUser)    
    }
  }
}
