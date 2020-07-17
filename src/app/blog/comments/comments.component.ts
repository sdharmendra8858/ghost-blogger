import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BlogService, blog, comment } from 'src/app/services/blog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: comment[];
  blogId: String;
  blog: blog;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => this.blogId = params.get('id'));
    
  }

  onSubmit(commentForm: NgForm){
    this.blogService.getBlog(this.blogId).subscribe((response) => console.log(response.comments)
    );

    // this.commentformvalue._id = 'test'
    // this.commentformvalue.author.avatar = './assets/images/pp3.jpg';
    // this.commentformvalue.message = commentForm.value.message;
    // this.commentformvalue.author.name = commentForm.value.name;

    // commentForm.resetForm();

    // this.blog.comments.push(this.commentformvalue);
  }

}
