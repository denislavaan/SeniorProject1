import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/NgModels/connection';
import { Pagination } from 'src/app/NgModels/pagination';
import { User } from 'src/app/NgModels/user';
import { UserParams } from 'src/app/NgModels/userParams';
import { ConnectionsService } from 'src/app/NgServices/connections.service';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css']
})
export class ConnectionListComponent implements OnInit {
  connections: Connection[]; //to make sure that the only thing that can be stored here is an arrey of connections. This is an observable of a connection array
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList: [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];

  constructor(private connectionService: ConnectionsService) { 
    this.userParams = this.connectionService.getUserParams();

    }
  
  ngOnInit(): void {
    this.loadConnections();
  }

  loadConnections() {
   this.connectionService.setUserParams(this.userParams);
    this.connectionService.getConnections(this.userParams).subscribe(response => {
      this.connections = response.result;
      this.pagination = response.pagination;
    })
  }

  Reset() {
    this.userParams = this.connectionService.resetUserParams(); 
    this.loadConnections();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.connectionService.setUserParams(this.userParams);
    this.loadConnections();
  }

}
