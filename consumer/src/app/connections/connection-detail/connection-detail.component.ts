import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionsService } from 'src/app/NgServices/connections.service';
import { Connection } from 'src/app/NgModels/connection';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.css']
})
export class ConnectionDetailComponent implements OnInit {
  connection: Connection;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[]; 
  

  constructor(private connectionService : ConnectionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadConnection();


    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false, 
      }
    ]
   
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.connection.photos) {
      imageUrls.push({
      small: photo.url, 
      medium: photo.url, 
      big: photo.url,
    })
  }
return imageUrls;
}


loadConnection() {
  this.connectionService.getConnection(this.route.snapshot.paramMap.get('username')).subscribe(connection => {
 this.connection = connection; 
 this.galleryImages = this.getImages(); 
  })
}
}
