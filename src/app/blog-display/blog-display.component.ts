import { Component, OnInit } from '@angular/core';

import { Blog } from '../shared/blog.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-display',
  templateUrl: './blog-display.component.html',
  styleUrls: ['./blog-display.component.css']
})
export class BlogDisplayComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  blog: Blog;

  ngOnInit(): void {
    this.blog = this.blogService.getBlog(2);
  }

}
