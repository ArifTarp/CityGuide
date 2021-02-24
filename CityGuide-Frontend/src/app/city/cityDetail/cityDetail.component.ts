import { Component, OnInit } from "@angular/core";
import { CityService } from "../../services/city.service";
import { City } from "../../models/City";
import { ActivatedRoute } from "@angular/router";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from "ngx-gallery";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-cityDetail",
  templateUrl: "./cityDetail.component.html",
  styleUrls: ["./cityDetail.component.css"],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {
  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService
  ) {}

  city: City;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCity(params['cityId']);
    });
  }

  //brings a City
  public getCity(cityId: string) {
    this.cityService.getCityByCityId(cityId).subscribe(data => {
      this.city = data;
      this.setGallery();
    });
  }

  //configuration for galleryOptions and galleryImages
  public setGallery() {
    this.galleryOptions = [
      {
        width: "600px",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  //using in setGallery() method and this method does configration galleryImages
  public getImages() {
    const photosUrls = [];
    for (let i = 0; i < this.city.photos.length; i++) {
      photosUrls.push({
        small: this.city.photos[i].url,
        medium: this.city.photos[i].url,
        big: this.city.photos[i].url
      });
    }
    return photosUrls;
  }

  isAuthanticated(){
    return this.authService.loggedIn()
  }
}