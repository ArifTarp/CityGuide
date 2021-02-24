import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../models/Photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  path="https://localhost:44343/api/cities/";
  photos:Photo[] = [];
  uploader:FileUploader;
  hasBaseDropZoneOver = false;
  currentMain:Photo;
  currentCityId:string;
  constructor(private authService:AuthService,private alertifyService:AlertifyService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.currentCityId = params['cityId']
    })
    this.initializeUploader();
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.path + this.currentCityId + "/photos",
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10*1024*1024
    })

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers)=>{
      if(response){
        let res:Photo = JSON.parse(response);
        console.log(res)
        let photo={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          description:res.description,
          isMain:res.isMain,
          cityId:res.cityId,
          publicId:res.publicId
        }
        this.photos.push(photo)
        console.log(photo)
      }
      console.log(this.photos)
    }

    
  }

}
