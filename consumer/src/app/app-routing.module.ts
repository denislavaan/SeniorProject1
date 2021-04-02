import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionDetailComponent } from './connections/connection-detail/connection-detail.component';
import { ConnectionEditComponent } from './connections/connection-edit/connection-edit.component';
import { ConnectionListComponent } from './connections/connection-list/connection-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './NgGuards/auth.guard';
import { PreventUnsavedChangesGuard } from './NgGuards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [
  {path: 'connections', component: ConnectionListComponent},
  {path: 'connections/:username', component: ConnectionDetailComponent},
  {path: 'connection/edit', component: ConnectionEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
  {path: 'messages', component: MessagesComponent},
  {path: 'lists', component: ListsComponent},
  ]
},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent} ,
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
