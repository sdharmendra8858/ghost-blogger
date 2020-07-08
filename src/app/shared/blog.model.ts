export class Comment{
  _id: String;
  message: String;
  author: String;
}

export class Blog {
  _id: String;
  title: String;
  image: String;
  description: String;
  author: String;
  tags: String[];
  comments: Comment[];
}