export class Comment{
  message: string;
  author: string;
}

export class Blog {
  title: string;
  image: string;
  description: string;
  author: string;
  tags: string[];
  comments: Comment[];
}