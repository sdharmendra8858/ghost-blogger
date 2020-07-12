import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDisplayComponent } from './blog/blog-display/blog-display.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { CommentsComponent } from './blog/comments/comments.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './profile/home/home.component';
import { MyBlogComponent } from './profile/my-blog/my-blog.component';
import { SecurityComponent } from './profile/security/security.component';
import { OthersComponent } from './profile/others/others.component';
import { FollowersModelComponent } from './followers-model/followers-model.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    CreateBlogComponent,
    BlogListComponent,
    BlogDisplayComponent,
    HeaderComponent,
    AuthComponent,
    ErrorPageComponent,
    BlogDetailComponent,
    CommentsComponent,
    ProfileComponent,
    HomeComponent,
    MyBlogComponent,
    SecurityComponent,
    OthersComponent,
    FollowersModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
