import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  isAuth: Boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticate.subscribe(isAuth => this.isAuth = isAuth);
  }

  onLogout(){
    this.authService.logout().subscribe(response => {
      console.log(response);
      
      this.route.navigate(['/auth']);
    })
  }

  onLogoutAll(){
    this.authService.logoutAll().subscribe(response => {
      console.log(response);
      
      this.route.navigate(['/auth'])
    })
  }

}
