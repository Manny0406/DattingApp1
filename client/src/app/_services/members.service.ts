import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Members } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Members[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) {
      return of(this.members); // "of" is read return an observable of something
    }

    return this.http.get<Members[]>(this.baseUrl + 'users').pipe(
      map(members => {    // map function is used to project what is returned from the API call
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x => x.userName === username)
    if(member) return of (member)

    return this.http.get<Members>(this.baseUrl + 'users/' + username)
  }

  updateMember(member: Members) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}  // the three dots (...) are called the spread operator and take all the elements for that particular object in the array
      })
    )
  }

  setMainPhoto(photoId:number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {}); // because it is a put request, we send an empty object
  }

  deletePhoto(photoId:number)
  {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

}
