import { Component, OnInit } from '@angular/core';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FollowersModelComponent } from '../followers-model/followers-model.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  background_image = './assets/images/web.jpg';
  fafacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faPlus = faPlus;

  followers: String[] = ["i","me", "myself"];
  following: String[] = ["you", "your", "yourself"];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
