import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    
    return this.http.post<authResponse>(url, {email, password})
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.authToken = resData.token;
          this.user = resData.user;
        })
        )
  }

  signUp(signupData){
    const url = environment.url + '/users';
    console.log(url);

    this.http.post<authResponse>(url, signupData)
    .subscribe(response => {
      console.log(response);
      [this.authToken, this.user] = [response.token, response.user];
    })
    
  }

  getAuthToken(){
    console.log(this.authToken);
    
    return this.authToken;
  }

private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An unknown error has occurred!";
  
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
  
    return throwError(errorMessage);
  }
}

