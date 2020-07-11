import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  background_image = './assets/images/web.jpg';

  constructor() { }

  ngOnInit(): void {
  }


}
