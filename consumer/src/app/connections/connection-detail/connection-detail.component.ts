import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionsService } from 'src/app/NgServices/connections.service';
import { Connection } from 'src/app/NgModels/connection';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/NgModels/message';
import { MessageService } from 'src/app/NgServices/message.service';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.css']
})
export class ConnectionDetailComponent implements OnInit {
  connection: Connection;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[]; 
  @ViewChild('PageTabs', {static: true}) pageTabs: TabsetComponent;
  activeTab: TabDirective;
  messages: Message[] = [];
  

  constructor(private connectionService : ConnectionsService, 
    private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.connection = data.connection; 
    })

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

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
    this.galleryImages = this.getImages();
   
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

loadMessages() {
  this.messageService.getMessageThread(this.connection.username).subscribe(messages => {
    this.messages = messages;
  })
}

selectTab(tabId: number) {
  this.pageTabs.tabs[tabId].active = true;
}

onTabActive(data: TabDirective){
  this.activeTab = data; //access to the information inside that tab
  if(this.activeTab.heading === 'Messages' && this.messages.length === 0) {
    this.loadMessages();
  }

}

}
