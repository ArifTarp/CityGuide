import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

import { City } from "../models/City";
import { Photo } from "../models/Photo";
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: "root"
})
export class CityService {
  path = "https://localhost:44343/api/";

  constructor(private httpClient: HttpClient,private alertifyService: AlertifyService,private router: Router) {}

  public getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + "cities");
  }

  public getCityByCityId(cityId: string): Observable<City> {
    return this.httpClient.get<City>(
      this.path + "cities/detail?cityId=" + cityId
    );
  }

  public getPhotosByCityId(cityId: string): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(
      this.path + "cities/photos?cityId=" + cityId
    );
  }

  public addCity(city: City): void {
    this.httpClient.post<City>(this.path + "cities/add", city).subscribe(data=>{
      this.alertifyService.success("The City Is Added Successful")
      this.router.navigateByUrl('/cityDetail/'+String(data.id))
    });
  }
}
