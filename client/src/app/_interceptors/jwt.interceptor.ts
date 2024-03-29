import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({  //take(1) means that once we get the object, we no longer need it (similar to unsubscribe)
      next: user => {
        if(user){
          request = request.clone({
            setHeaders:{
              Authorization: 'Bearer ' + user.token
            }
          })
        }
      }
    }) 

    return next.handle(request);
  }
}
