import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    MatStepperModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
