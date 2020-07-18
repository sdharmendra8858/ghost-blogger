import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FollowersModelComponent } from '../followers-model/followers-model.component';
import { UserService, user } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  background_image = './assets/images/web.jpg';
  profileImage = './assets/images/default.png';
  fafacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faPlus = faPlus;
  userProfile: user;

  followers: String[] = ["i","me", "myself"];
  following: String[] = ["you", "your", "yourself"];

  constructor(private dialog: MatDialog, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get<user>('http://localhost:3000/users/me').subscribe(profile => this.userProfile = profile);
    this.userService.getMyProfile().subscribe(response => {
      this.userProfile = response;
      this.userService.profile.next(response);
    });
  }

  openFollowerModel(action: String){
    var data = action === 'follower' ? this.followers : this.following;
    this.dialog.open(FollowersModelComponent, {
      maxHeight: '500px',
      width: '35%',
      minWidth: '350px',
      data: {
        action,
        data
      }
    })
  }


}
