export class Comment{
  message: String;
  author: String;
}

export class Blog {
  title: String;
  image: String;
  description: String;
  author: String;
  tags: String[];
  comments: Comment[];
}