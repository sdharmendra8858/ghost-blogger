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
      ],
      tags: []
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
      ],
      tags: []
    },{
      'title': 'first blog',
      'author': 'ghost7210',
      'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id tincidunt orci. Nulla imperdiet justo sed dolor condimentum, vitae ornare leo volutpat. Curabitur ligula mi, pretium eget porttitor nec, cursus et dolor. Donec risus mi, tincidunt at fermentum porttitor, commodo rhoncus elit. In ac leo risus. Nam pretium tincidunt odio, sed dapibus magna. Vestibulum sit amet est id nisl varius tincidunt. Sed suscipit ultrices ante. Nam maximus fermentum mauris nec efficitur. Nulla condimentum aliquam nisi vitae tincidunt,

      Aenean sodales dolor et condimentum convallis. Nullam rhoncus nulla egestas, dignissim ex sit amet, ultricies quam. Cras condimentum ultrices nulla, id lacinia quam vehicula eget. Donec molestie eget erat ut tincidunt. Praesent pellentesque justo mi, eu eleifend ligula laoreet quis. Nam varius arcu dapibus felis fermentum, a fringilla ex volutpat. Maecenas feugiat felis ac erat aliquet ultrices. Vestibulum consectetur mattis justo, ut pulvinar est commodo nec. Aliquam risus eros, interdum at ipsum sit amet, dictum porta elit. Curabitur cursus sem et erat scelerisque tempor. Nam convallis ex id lacus pellentesque, a consequat purus convallis. Praesent in faucibus turpis. Fusce sed eros eu nibh tristique venenatis. Nam elementum cursus tellus, sit amet ullamcorper diam porta ac. Ut tempor vestibulum nisi eget pulvinar. Nam varius ipsum sed augue rhoncus mattis.
      
      Etiam et varius felis. Vivamus rhoncus, dui ultrices tempus lobortis, nisi lectus volutpat erat, ut tristique nisi purus vel eros. Aliquam pretium justo id dui pharetra facilisis. Ut non ipsum nunc. Morbi id dignissim dolor. Aliquam ultricies purus vitae consequat tempus. Sed et sapien vitae nisl sodales scelerisque.
      
      Cras porta diam et ullamcorper convallis. Proin volutpat lectus enim, ut consequat est pretium vitae. Nullam in posuere tortor. Aliquam vulputate volutpat congue. Fusce quis gravida quam. Nulla facilisi. Vivamus tempus blandit libero, id venenatis ante ultricies sit amet. Quisque non lectus ut tortor rhoncus maximus.
      
      Sed in justo id tellus interdum interdum. Aenean sit amet justo quis ex venenatis malesuada. Phasellus tristique consequat dui quis dictum. Aliquam erat volutpat. Ut suscipit ornare mauris varius laoreet. Nunc facilisis elementum euismod. Sed vel velit sollicitudin, fringilla quam vel, facilisis magna. Cras nulla sapien, elementum at ex sit amet, dignissim accumsan nunc. Aliquam placerat turpis ut mi ultricies, vitae aliquet purus congue. Duis ullamcorper sagittis nulla eu placerat.
      
      Generated 5 paragraphs, 369 words, 2516 bytes of Lorem Ipsum`,
      'image': 'https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w',
      'comments': [
        {
          'message': 'Good',
          'author': 'ghost101'
        }
      ],
      tags: []
    },
  ]


  getBlogs(){
    return this.blog.slice();
  }

  getBlog(id: number){
    return (this.blog[id]);
  }

  postBlog(blog: Blog){
    this.blog.push(blog);
  }

}
