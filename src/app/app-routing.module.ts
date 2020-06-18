import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {
    path: 'home', component: BlogListComponent
  },
  {
    path: 'create-blog', component: CreateBlogComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo:"home"
  },
  {
    path: '**', component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
