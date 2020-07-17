import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService, blog } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';

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

    //get blog details
    this.blogService.getBlog(id).subscribe(response => this.blog = response);

    //get comments details
    this.blogService.getComments(id).subscribe(comments => {
      this.blog.comments = comments
      
      comments.forEach(comment => {
        comment.author.avatar = `${environment.url}/users/${comment.author._id}/avatar`;
        console.log(comment.author.avatar);
      })
    });
    
  }

}
