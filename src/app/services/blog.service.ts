import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
// import { Users } from '../shared/users';
import { throwError } from 'rxjs';
import { user } from './user.service';

export interface blog {
  _id: String;
  image: String;
  title: String;
  description: String;
  tags: String[];
  author: user;
  comments: comment[];
}

export interface comment {
  author: user;
  message: String;
}

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }
  url = environment.url + '/blogs';
  
getBlogs(){
   return this.http.get<blog[]>(this.url).pipe(catchError(this.handleError));
}

postBlog(data){
  console.log(data);
  
}

getBlog(id: String){
  const newUrl = this.url + '/'+id;
  return this.http.get<blog>(newUrl).pipe(catchError(this.handleError));
}

getComments(id:String){
  const newUrl = this.url +"/"+id+"/comments";
  return this.http.get<comment[]>(newUrl).pipe(catchError(this.handleError));
}


  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An unknown error has occurred!";
  
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
  
    return throwError(errorMessage);
  }

}
