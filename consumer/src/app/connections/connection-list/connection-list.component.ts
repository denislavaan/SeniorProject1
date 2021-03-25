import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/NgModels/connection';
import { ConnectionsService } from 'src/app/NgServices/connections.service';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css']
})
export class ConnectionListComponent implements OnInit {
  connections: Connection[]; //to make sure that the only thing that can be stored here is an arrey of connections

  constructor(private connectionService: ConnectionsService) { }

  ngOnInit(): void {
    this.loadConnections();
  }

  loadConnections(){
    this.connectionService.getConnections().subscribe(connections => {
      this.connections = connections;
      console.log(this.connections);
    })
  }

}
