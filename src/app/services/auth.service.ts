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
  authToken: String;
  loggedUser: Users;
  isLoggedIn: Boolean = false;
  isAuthenticate = new Subject<Boolean>();

  login({email, password}){
    const url = environment.url + '/users/login';
    
    return this.http.post<authResponse>(url, {email, password})
      .pipe(
        tap(resData => {
          this.setUserData(resData.user, resData.token);
          this.isLoggedIn = true;
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
      this.setUserData(response.user, response.token);
      this.isLoggedIn = true;
      this.isAuthenticate.next(true);
    })
    
  }

  logout(){
    const url = environment.url + '/users/logout';
    return this.http.post(url, "").pipe(
      tap(response => {
        this.removeUserData();
        this.isLoggedIn = false;
      }),
      catchError(this.handleError)
    );
  }

  logoutAll(){
    const url = environment.url + '/users/logoutAll';
    return this.http.post(url, "").pipe(
      tap(response => {
        this.removeUserData();
        this.isLoggedIn = false;
      }),
      catchError(this.handleError)
    );
  }

  isUserLoggedIn():Boolean{
    if(this.getAuthToken()){
      this.isAuthenticate.next(true);
      return true;
    }
    return this.isLoggedIn;
  }

  setUserData(user, token){
    this.loggedUser = user;
    this.authToken = token;
    this.storeToken(token)
  }

  removeUserData(){
    this.loggedUser = null;
    this.isAuthenticate.next(false);
    this.removeToken();
  }

  getAuthToken(){
    if(!this.authToken){
      this.authToken = localStorage.getItem('token');
    }
    return this.authToken;
  }

  storeToken(token){
    localStorage.setItem('token', token);
  }

  removeToken(){
    localStorage.removeItem('token');
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

