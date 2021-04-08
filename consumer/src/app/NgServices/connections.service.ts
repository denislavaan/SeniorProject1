import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Connection } from '../NgModels/connection';
import { PaginatedResult } from '../NgModels/pagination';
import { User } from '../NgModels/user';
import { UserParams } from '../NgModels/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  baseUrl = environment.UrlAPI;
  connections: Connection[] = [];
  connectionCache = new Map(); //stores values as key value format
  user: User;
  userParams: UserParams;
  
  

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }
  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getConnections(userParams: UserParams) {
    var response = this.connectionCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    
    return getPaginatedResult<Connection[]>(this.baseUrl + 'users', params, this.http)
    .pipe(map(response => {
      this.connectionCache.set(Object.values(userParams).join('-'), response);
      return response;
    }))}

  

  getConnection(username: string){
    const connection = [...this.connectionCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((connection: Connection) => connection.username === username);

  if (connection) {
    return of(connection);
  }
      return this.http.get<Connection>(this.baseUrl + 'users/' + username);
    }


  updateConnection(connection: Connection) {

      return this.http.put(this.baseUrl + 'users', connection).pipe(
        map(() => {
          const index = this.connections.indexOf(connection);
          this.connections[index] = connection;
        })
      )
    }

  setProfilePhoto(photoId: number) {
      return this.http.put(this.baseUrl + 'users/set-profile-photo/' + photoId, null);
    }

  deletePhoto(photoId: number) {
      return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
    }

  addRecommendation(username: string) {
    return this.http.post(this.baseUrl + 'recommendations/' + username, {});
  }

  getRecommendations(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Connection[]>>(
      this.baseUrl + 'recommendations', params, this.http);
  }

  
}
