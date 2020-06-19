import { Component, OnInit } from '@angular/core';

import { Blog } from '../shared/blog.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  lists: Blog[];

  ngOnInit(): void {
    this.lists = this.blogService.getBlogs();
    console.log(this.lists);
    
  }

}
