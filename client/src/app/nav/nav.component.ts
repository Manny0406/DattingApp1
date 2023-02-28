import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_modules/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // initialize as an empty object 

  constructor(public accountService:AccountService) //when is public the service can be used in the HTML template too
  { }

  ngOnInit(): void {
    //this.currentUser$ = this.accountService.currentUser$
  }

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe({
  //     next:user => this.loggedIn = !!user, // double exclamation mark tranform the user to a boolean
  //     error: error => console.log(error)
  //   })
  // }

  login()
  {
    this.accountService.login(this.model).subscribe({
      next:response => {
        console.log(response);        
      },
      error: error => console.error()      
    })
  }

  logout(){
    this.accountService.logout();   
  }

}
