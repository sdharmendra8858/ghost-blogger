import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

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

  authToken = new Subject<String>();
  loggedUser: Users;
  isAuthenticate = new Subject<Boolean>();

  login({email, password}){
    const url = environment.url + '/users/login';
    
    return this.http.post<authResponse>(url, {email, password})
      .pipe(
        tap(resData => {
          this.setLoginData(resData.user, resData.token);
          this.isAuthenticate.next(true);
        }),
        catchError(this.handleError)
        )
      
  }

  signUp(signupData){
    const url = environment.url + '/users';
    console.log(url);

    this.http.post<authResponse>(url, signupData)
    .subscribe(response => {
      this.setLoginData(response.user, response.token);
      this.isAuthenticate.next(true);
    })
    
  }

  setLoginData(user, token){
    this.authToken.next(token);
    this.loggedUser = user;
    this.storeToken(token)
  }

  getAuthToken(){
    return localStorage.getItem('token');
  }

  storeToken(token){
    localStorage.setItem('token', token);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An unknown error has occurred!";
    this.isAuthenticate.next(false);
  
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
  
    return throwError(errorMessage);
  }
}

