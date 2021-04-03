import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Connection } from '../NgModels/connection';




@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  baseUrl = environment.UrlAPI;
  connections: Connection[] = [];
  
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
    })
  };

  constructor(private http: HttpClient) { }

  getConnections() {
    if (this.connections.length > 0) return of(this.connections); //
    return this.http.get<Connection[]>(this.baseUrl + 'users', this.httpOptions).pipe(
      map(connections => {
        this.connections = connections;
        return connections;
      })
    )
    }
  getConnection(username: string){
    const connection = this.connections.find(x => x.username === username);
    if(connection !== undefined) return of(connection);
      return this.http.get<Connection>(this.baseUrl + 'users/' + username, this.httpOptions);
    }
  updateConnection(connection: Connection) {

      return this.http.put(this.baseUrl + 'users', connection, this.httpOptions).pipe(
        map(() => {
          const index = this.connections.indexOf(connection);
          this.connections[index] = connection;
        })
      )
    }

  setProfilePhoto(photoId: number) {
      return this.http.put(this.baseUrl + 'users/set-profile-photo/' + photoId, null, this.httpOptions);
    }

  deletePhoto(photoId: number) {
      return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, this.httpOptions);
    }
}
