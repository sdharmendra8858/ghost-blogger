import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { user } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginTrue: boolean = true;
  hidePassword: boolean = true;
  returnUrl: string = 'home'

  login = {email: "", password: ""};
  register = {
    name : '',
    email : '',
    gender : 'male',
    dob: '',
    password: ''
  }

  errorMsg = {
      'email': {
        'required': 'Email is required!',
        'email': 'Invalid Email Format!'
      },
      'password': {
        'required': 'Password is Required!',
        'minlength': 'Password must be 6 characters long!'
      },
      'name': {
        'required': 'Name is required!',
        'minlength': 'Name must be 3 characters long!',
        'maxlength': 'Name must not be more than 20 characters!'
      },
      'gender': {
        'required': 'Gender is required!'
      },
      'dateofBirth': {
        'required': 'Date of Birth is required!'
      }
  }

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      var urls = params.getAll('retUrl');
      var newUrl = "";
      urls.map(url => newUrl += url + '/');
      newUrl = newUrl.substring(0,newUrl.length-1);
      this.returnUrl = newUrl;
      
    });
  }

  onLogin(loginData: NgForm){
    this.authService.login(loginData.value)
    .subscribe(response => {
      this.router.navigateByUrl(this.returnUrl);
      console.log(response)
    }, (error)=> console.log("Error", error)
    );
  }

  onRegister(registerData: NgForm){
    console.log(registerData.value);
    this.authService.signUp(registerData.value);
    this.router.navigate(['/home']);
  }
}
