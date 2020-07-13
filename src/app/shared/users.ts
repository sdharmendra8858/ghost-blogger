import { Time } from '@angular/common';

export interface Users {
  name: String;
  email: String;
  password: String;
  dateofBirth: Date;
  avatar: String;
  token: String[];
  timestamp: Time;
}
