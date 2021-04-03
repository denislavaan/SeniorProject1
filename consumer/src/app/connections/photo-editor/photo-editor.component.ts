import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Connection } from 'src/app/NgModels/connection';
import { Photo } from 'src/app/NgModels/photo';
import { User } from 'src/app/NgModels/user';
import { AccountService } from 'src/app/NgServices/account.service';
import { ConnectionsService } from 'src/app/NgServices/connections.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() connection: Connection;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.UrlAPI;
  user: User;


  constructor(private accountService: AccountService, private connectionService: ConnectionsService ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); //this gives us access to the current user 
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event: any) {
    this.hasBaseDropzoneOver = event;
  }

  setProfilePhoto(photo: Photo) {
    this.connectionService.setProfilePhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user); //will update the current user observable and the photo inside local storage 
      this.connection.photoUrl = photo.url;
      this.connection.photos.forEach(p => {
        if (p.isMain) p.isMain = false; //check if p is the main photo currently 
        if (p.id === photo.id) p.isMain = true; //then i ckeck for p that matches the photo id then set p to be a profile pic
      })
    })
  }
  deletePhoto(photoId: number) {
    this.connectionService.deletePhoto(photoId).subscribe(() => {
      this.connection.photos = this.connection.photos.filter(p => p.id !== photoId); //filters out the other photos 
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'], 
      removeAfterUpload: true,
      autoUpload: false,
      
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    //below is what happens after the uploader has successfully uploaded
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.connection.photos.push(photo); 
      }
    }
  }

}
