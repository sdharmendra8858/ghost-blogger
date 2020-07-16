import { Component, OnInit } from '@angular/core';

import { BlogService, blog } from 'src/app/services/blog.service';
// import { Blog } from 'src/app/shared/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  lists: blog[];

  ngOnInit(): void {
    this.blogService.getBlogs()
    .subscribe(blogs => {
      this.lists = blogs;
    }, (error) => console.log(error)
    );
  }

}
