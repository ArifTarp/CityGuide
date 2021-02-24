import { Component, OnInit } from '@angular/core';
import { City } from '../models/City';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {

  cities:City[];
  constructor(private cityService:CityService) { 
    this.cityService.getCities().subscribe(data=>{
      this.cities=data;
      console.log(this.cities);
    })
  }
  
  ngOnInit() {
  }

}
