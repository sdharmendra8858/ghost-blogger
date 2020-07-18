import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface user {
  _id: String;
  name: String;
  email: String;
  gender: String;
  dateofBirth: Date;
  avatar: String;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
   }

  url: String = 'http://localhost:3000/users';
  profile: Subject<user> = new Subject<user>();

  getMyProfile(){
    const newUrl = this.url + '/me';
    return this.http.get<user>(newUrl).pipe(
      tap(response => {
        
        var profileAvatarUrl = environment.url + '/users/' + response._id + '/avatar';
        response.avatar = response.avatar ? profileAvatarUrl: './assets/images/default.png';
      })
    );
  }

}
