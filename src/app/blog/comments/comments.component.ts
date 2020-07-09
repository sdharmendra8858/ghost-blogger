import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Comment, Blog } from 'src/app/shared/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  blogId: String;
  blog: Blog;

  ///////dev//////
  commentformvalue: Comment = {
    '_id': '',
    'message': '',
    'author': {
      'name': '',
      'email': '',
      'avatar': ''
    }
  };

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.blogId = params.get('id'));
    
  }

  onSubmit(commentForm: NgForm){
    this.blog = this.blogService.getBlog(this.blogId);

    this.commentformvalue._id = 'test'
    this.commentformvalue.author.avatar = './assets/images/pp3.jpg';
    this.commentformvalue.message = commentForm.value.message;
    this.commentformvalue.author.name = commentForm.value.name;

    commentForm.resetForm();

    this.blog.comments.push(this.commentformvalue);
  }

}
