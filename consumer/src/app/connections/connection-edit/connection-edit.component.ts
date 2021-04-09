import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Connection } from 'src/app/NgModels/connection';
import { User } from 'src/app/NgModels/user';
import { AccountService } from 'src/app/NgServices/account.service';
import { ConnectionsService } from 'src/app/NgServices/connections.service';

@Component({
  selector: 'app-connection-edit',
  templateUrl: './connection-edit.component.html',
  styleUrls: ['./connection-edit.component.css']
})
export class ConnectionEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
connection: Connection;
user: User;

  constructor(private accountService: AccountService, private connectionService: ConnectionsService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); 
   } 
   //getting the user from the accountService. After that getting the username from the user and fetching this data to the specific user. 
//to populate the user object with the data from the account service, I'm using the pipe and taking the currentUser$ from the accountService
  ngOnInit(): void {
   this.loadConnection();
  }
loadConnection() {
  this.connectionService.getConnection(this.user.userName).subscribe(connection => {
   
    this.connection = connection;
  })
}
updateConnection() {
  this.connectionService.updateConnection(this.connection).subscribe(() => {
  this.toastr.success('The changes are saved!');
  this.editForm.reset(this.connection);
})
}
}
