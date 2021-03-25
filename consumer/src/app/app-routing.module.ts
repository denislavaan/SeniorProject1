import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionDetailComponent } from './connections/connection-detail/connection-detail.component';
import { ConnectionListComponent } from './connections/connection-list/connection-list.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './NgGuards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connections', component: ConnectionListComponent, canActivate: [AuthGuard]},
  {path: 'connections/:username', component: ConnectionDetailComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent, pathMatch: 'full'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
