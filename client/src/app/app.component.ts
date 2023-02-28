import { Component, OnInit } from '@angular/core';
import { User } from './_modules/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  

  constructor(private accountService:AccountService){}
  
  ngOnInit(): void {
    // this.http.get('https://localhost:5001/api/users').subscribe(data =>{
    //   this.users = data;
    // });
    
    this.setCurrentUser();
    
  } 

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(!userString) return; // if there is no user then leave method, otherwise continue
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  

}
