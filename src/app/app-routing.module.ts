import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDisplayComponent } from './blog/blog-display/blog-display.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './profile/home/home.component';
import { MyBlogComponent } from './profile/my-blog/my-blog.component';
import { SecurityComponent } from './profile/security/security.component';
import { OthersComponent } from './profile/others/others.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: 'home', component: BlogListComponent
  },
  {
    path: 'blogs/:id', component: BlogDisplayComponent
  },
  {
    path: 'create-blog', component: CreateBlogComponent, canActivate: [AuthGuard]
  },
  {
    path: 'users/me', component: ProfileComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent},
      {path: 'home', redirectTo: ''},
      {path: 'my-blog', component: MyBlogComponent},
      {path: 'security', component: SecurityComponent},
      {path: 'others', component: OthersComponent}
    ]
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
