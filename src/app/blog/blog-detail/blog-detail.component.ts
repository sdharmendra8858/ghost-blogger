import { Component, OnInit, Input } from '@angular/core';

import { Blog } from 'src/app/shared/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  @Input() blog: Blog;

  constructor() { }

  ngOnInit(): void {
  }

}
