import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BlogDisplayComponent } from './blog-display/blog-display.component';


const routes: Routes = [
  {
    path: 'home', component: BlogListComponent
  },
  {
    path: 'blog/:id', component: BlogDisplayComponent
  },
  {
    path: 'create-blog', component: CreateBlogComponent
  },
  {
    path: 'auth', component: AuthComponent
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
