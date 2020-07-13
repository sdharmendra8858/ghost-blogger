import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Users } from '../shared/users';

export interface authResponse {
  user: Users;
  token: String;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http: HttpClient) { }

  authToken: String = "";
  user: Users;

  login({email, password}){
    const url = environment.url + '/users/login';
    console.log(url);
    
    this.http.post<authResponse>(url, {email, password})
      .subscribe(response => {
        console.log(response);
        
        this.authToken = response.token;
        this.user = response.user;
      }
      )
  }

  getAuthToken(){
    console.log(this.authToken);
    
    return this.authToken;
  }
}
