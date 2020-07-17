import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector){};
  authToken: String;
  
  intercept(request: HttpRequest<any>, next: HttpHandler){
    let authService = this.injector.get(AuthService);
    authService.authToken.subscribe(token => this.authToken = token);
    const tokenizedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getAuthToken()}`
      }
    })

    return next.handle(tokenizedReq);
  }
}