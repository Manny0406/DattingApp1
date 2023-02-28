import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister = new EventEmitter(); // because is an ouput and we want to emit and event
  model: any = {} //curly brackets means that it is initialized with an empty object

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next:() => {
        this.cancel();
      },
      error: error => console.log(error)
    })
  }

  cancel(){
  this.cancelRegister.emit(false);
  }
}
