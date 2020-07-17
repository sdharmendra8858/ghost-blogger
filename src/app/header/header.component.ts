import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isAuth: Boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticate.subscribe(isAuth => this.isAuth = isAuth);
  }

  onLogout(){
    
  }

}
