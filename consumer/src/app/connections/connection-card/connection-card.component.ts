import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Connection } from 'src/app/NgModels/connection';
import { ConnectionsService } from 'src/app/NgServices/connections.service';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.css'],
})
export class ConnectionCardComponent implements OnInit {

  @Input() connection: Connection;

  constructor(private connectionService: ConnectionsService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addRecommendation(connection: Connection) {
    this.connectionService.addRecommendation(connection.username).subscribe(() => {
      this.toastr.success('You have recommended ' + connection.nickname + ' and their skill in ' + connection.interestedIn);

    })
  }

}
