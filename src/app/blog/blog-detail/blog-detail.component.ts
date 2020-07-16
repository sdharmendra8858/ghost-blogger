import { Component, OnInit, Input } from '@angular/core';

// import { Blog } from 'src/app/shared/blog.model';
import { blog } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  @Input() blog: blog;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.blog);
    
  }

}
