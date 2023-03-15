import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // baseUrl = 'https://localhost:5001/api/'; // this was moved to environment folder
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null); // <User | null> means that it can be User or null
  currentUser$ = this.currentUserSource.asObservable(); // the dollar sign $ is a convention to specify that the variable is an observable

  constructor(private http: HttpClient) { }

  login(model: any) { // because is a http post request we need to send something on the body. pipe is used to do something with the observable
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response:User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
      })
    ) 
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user:User) {
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
