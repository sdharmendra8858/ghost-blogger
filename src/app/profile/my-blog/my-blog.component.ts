import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css']
})
export class MyBlogComponent implements OnInit {
  items = [1,2,3]

  constructor() { }

  ngOnInit(): void {
  }

}
