import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  client;

  getUsers(){
    this.http.get('http://localhost:3000/users').subscribe((users) => {
      // console.log(users);
    })
  }

}
