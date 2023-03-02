import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // initialize as an empty object 

  constructor(public accountService:AccountService
            , private router:Router
            , private toastr:ToastrService) //when is public the service can be used in the HTML template too
  { }

  ngOnInit(): void {    
  }

  login()
  {
    this.accountService.login(this.model).subscribe({
      next:() =>  this.router.navigateByUrl('/members'),
      error: error => this.toastr.error(error.error)    
    })
  }

  logout(){
    this.accountService.logout();   
    this.router.navigateByUrl('/')
  }

}
