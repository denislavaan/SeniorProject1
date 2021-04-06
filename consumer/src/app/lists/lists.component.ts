import { Component, OnInit } from '@angular/core';
import { Connection } from '../NgModels/connection';
import { Pagination } from '../NgModels/pagination';
import { ConnectionsService } from '../NgServices/connections.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  connections: Partial<Connection[]>;
  predicate = 'recommended';
  pageNumber = 1;
  pageSize = 12;
  pagination: Pagination;

  constructor(private connectionService: ConnectionsService) { }

  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations() {
    this.connectionService.getRecommendations(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.connections = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadRecommendations();
  }

}
