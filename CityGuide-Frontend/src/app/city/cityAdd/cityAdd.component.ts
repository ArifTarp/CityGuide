import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";


import { CityService } from "src/app/services/city.service";
import { City } from "src/app/models/City";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: "app-cityAdd",
  templateUrl: "./cityAdd.component.html",
  styleUrls: ["./cityAdd.component.css"],
  providers: [CityService]
})
export class CityAddComponent implements OnInit {
  constructor(private cityService: CityService,private formBuilder: FormBuilder, private authService: AuthService) {}

  city: City;
  cityAddForm: FormGroup;

  ngOnInit() {
    this.createCityForm();    
  }

  createCityForm(){
    this.cityAddForm = this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required]
    })
  }

  addCity() {
    if(this.cityAddForm.valid){
      this.city = Object.assign({},this.cityAddForm.value)
      this.city.userId = 1;
      this.cityService.addCity(this.city)    
    }
  }
}
