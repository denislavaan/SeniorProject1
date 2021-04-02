import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Connection } from '../NgModels/connection';



@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  baseUrl = environment.UrlAPI;
  
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
    })
  };

  constructor(private http: HttpClient) { }

  getConnections() {
    return this.http.get<Connection[]>(this.baseUrl + 'users', this.httpOptions);
    }
  getConnection(username: string){
      return this.http.get<Connection>(this.baseUrl + 'users/' + username, this.httpOptions);
    }
    updateConnection(connection: Connection) {
      return this.http.put(this.baseUrl + 'users', connection, this.httpOptions);
    }
}
