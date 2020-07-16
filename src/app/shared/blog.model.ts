import { User } from './user.model';

export interface Comment{
  _id: String;
  message: String;
  author: User;
}

export interface Blog {
  _id: String;
  title: String;
  image: String;
  description: String;
  author: String;
  tags: String[];
  comments: Comment[];
}