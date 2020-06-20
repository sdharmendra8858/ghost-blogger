import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {

  }

  loginStatus(){
    this.loginTrue = !this.loginTrue;
  }

  onLogin(loginData: NgForm){
    console.log(loginData);
  }

  onHidePassword(){
    this.hidePassword = !this.hidePassword;
  }

  onRegister(registerData: NgForm){
    console.log(registerData);
    
  }
}
