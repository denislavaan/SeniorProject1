import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionsService } from 'src/app/NgServices/connections.service';
import { Connection } from 'src/app/NgModels/connection';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.css']
})
export class ConnectionDetailComponent implements OnInit {
  connection: Connection;

  constructor(private connectionService : ConnectionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadConnection();
  }
loadConnection() {
  this.connectionService.getConnection(this.route.snapshot.paramMap.get('username')).subscribe(connection => {
 this.connection = connection; 
  })
}
}
