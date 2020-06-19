import { Injectable } from '@angular/core';

import { Blog } from '../shared/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  blog: Blog[] = [
    {
      'title': 'first blog',
      'author': 'ghost721',
      'description': 'Some quick example text to build on the card title and make up the bulk of the cards content.',
      'image': 'https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w',
      'comments': [
        {
          'message': 'Good',
          'author': 'ghost101'
        }
      ]
    },{
      'title': 'first blog',
      'author': 'ghost721',
      'description': 'Some quick example text to build on the card title and make up the bulk of the cards content.',
      'image': 'https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w',
      'comments': [
        {
          'message': 'Good',
          'author': 'ghost101'
        }
      ]
    },{
      'title': 'first blog',
      'author': 'ghost721',
      'description': 'Some quick example text to build on the card title and make up the bulk of the cards content.',
      'image': 'https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w',
      'comments': [
        {
          'message': 'Good',
          'author': 'ghost101'
        }
      ]
    },
  ]


  getBlogs(){
    return this.blog.slice();
  }

  postBlog(blog: Blog){
    this.blog.push(blog);
  }

}
