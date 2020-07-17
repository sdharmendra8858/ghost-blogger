import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginTrue: boolean = true;
  hidePassword: boolean = true;

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

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {

  }

  onLogin(loginData: NgForm){
    console.log(loginData.value);
    this.authService.login(loginData.value)
    .subscribe(response => console.log(response), (error)=> console.log("Error", error)
    );
    this.route.navigate(['/home']);
  }

  onRegister(registerData: NgForm){
    console.log(registerData.value);
    this.authService.signUp(registerData.value);
    this.route.navigate(['/home']);
  }
}
