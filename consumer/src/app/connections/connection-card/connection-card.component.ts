import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/NgModels/connection';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.css'],
})
export class ConnectionCardComponent implements OnInit {

  @Input() connection: Connection;

  constructor() { }

  ngOnInit(): void {
  }

}
