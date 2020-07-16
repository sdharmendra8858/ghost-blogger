import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService, blog } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-display',
  templateUrl: './blog-display.component.html',
  styleUrls: ['./blog-display.component.css']
})
export class BlogDisplayComponent implements OnInit {

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  blog: blog;
  blogId: String;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.blogId = params.get('id'));
    this.getDetail(this.blogId);
  }

  getDetail(id: String){
    this.blogService.getBlog(id).subscribe(response => this.blog = response);
    this.blogService.getComments(id).subscribe(comments => this.blog.comments = comments)
  }

}
