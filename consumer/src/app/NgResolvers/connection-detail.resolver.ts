import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Connection } from "../NgModels/connection";
import { ConnectionsService } from "../NgServices/connections.service";


@Injectable({
    providedIn: 'root'
})

export class ConnectionDetailResolver implements Resolve<Connection> {

    constructor(private connectionService: ConnectionsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Connection> {
        return this.connectionService.getConnection(route.paramMap.get('username')); 
    }
}