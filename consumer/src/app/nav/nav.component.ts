import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { User } from '../NgModels/user';
import { AccountService } from '../NgServices/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {}
currentUser$: Observable<User>;
loggedIn: boolean;

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }
login(){
  this.accountService.login(this.model).subscribe(response => {
    this.router.navigateByUrl('/connections');
    this.loggedIn = true;
  }, error=> {
console.log(error);
this.toastr.error(error.error); //to see the reason why the log in has failed
  }  )
}
logout() {
  this.loggedIn = false;
  this.accountService.logout();
  this.router.navigateByUrl('/');
}
}