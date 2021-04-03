import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection } from 'src/app/NgModels/connection';
import { ConnectionsService } from 'src/app/NgServices/connections.service';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css']
})
export class ConnectionListComponent implements OnInit {
  connections$: Observable<Connection[]>; //to make sure that the only thing that can be stored here is an arrey of connections. This is an observable of a connection array

  constructor(private connectionService: ConnectionsService) { }

  ngOnInit(): void {
    this.connections$ = this.connectionService.getConnections();
  }

}
