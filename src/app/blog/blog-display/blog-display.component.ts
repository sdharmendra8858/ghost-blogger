import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/shared/blog.model';

@Component({
  selector: 'app-blog-display',
  templateUrl: './blog-display.component.html',
  styleUrls: ['./blog-display.component.css']
})
export class BlogDisplayComponent implements OnInit {

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  blog: Blog;
  blogId: String;

  ngOnInit(): void {
    // this.blog = this.blogService.getBlog(2);
    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('id');
      }
    )

    console.log(this.blogId);
    this.findDetails(this.blogId);
    
  }

  findDetails(id: String){
    this.blog = this.blogService.getBlogs().filter(blog => blog._id === id)[0];
  }

}
