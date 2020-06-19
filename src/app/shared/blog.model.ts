import { User } from './user.model';

export class Comment{
  message: string;
  author: string;
}

export class Blog {
  title: string;
  image: string;
  description: string;
  author: string;
  comments: Comment[];
}