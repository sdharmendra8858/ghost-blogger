import { User } from './user.model';

export class Comment{
  _id: String;
  message: String;
  author: User;
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