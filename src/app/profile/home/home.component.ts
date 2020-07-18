import { Component, OnInit, Input } from '@angular/core';
import { user, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: user;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.profile.subscribe(profile => this.profile = profile);
    if(!this.profile){
      this.userService.getMyProfile().subscribe(response => {
        this.profile = response;
        this.userService.profile.next(response);
      })
    }
  }

}
