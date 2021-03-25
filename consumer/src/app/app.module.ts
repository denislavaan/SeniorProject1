import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule} from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { ConnectionListComponent } from './connections/connection-list/connection-list.component';
import { ConnectionDetailComponent } from './connections/connection-detail/connection-detail.component';
import { ConnectionCardComponent } from './connections/connection-card/connection-card.component';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    ConnectionListComponent,
    ConnectionDetailComponent,
    ConnectionCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
positionClass: 'toast-top-center'
    }),
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    TabsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
