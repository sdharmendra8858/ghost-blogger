import { Component, OnInit } from '@angular/core';

import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/shared/blog.model';

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
