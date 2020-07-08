import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'; 
import { Router } from '@angular/router';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatChipInputEvent } from '@angular/material/chips';

import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/shared/blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateBlogComponent implements OnInit {

  constructor(private blogService: BlogService, private _formBuilder: FormBuilder, private router: Router) {}

  blogTemplate: Blog = {
    '_id': '',
    'title' : '',
    'author': '',
    'comments': [],
    'description': '',
    'image': 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'tags': []
  };

  ////////   quill editor
  previewTemplate = '';
  blog = '';

  ////////   section one title
  hero_image_file_name = "";
  hero_image_file : File = null;
  hero_image_url: String = '';
  title: String;

  //////// section three tags
  selectable = true;
  removable = true;
  visible = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: String[] = [];


  //////// form groups
  firstFormGroup: FormGroup;
  editorForm: FormGroup;
  tagsFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      hero_image: ['', Validators.required]
    });
    this.editorForm = this._formBuilder.group({
      editor: ['', Validators.required]
    });
    this.tagsFormGroup = this._formBuilder.group({
      tagsCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    
  }


onFormSubmit(){
  this.blogTemplate._id ='' + Math.random()*100000;
  this.blogTemplate.title = this.firstFormGroup.value.title;
  this.blogTemplate.image = this.hero_image_url;
  this.blogTemplate.description = this.previewTemplate;
  this.blogTemplate.tags = this.tags;


  console.log(this.blogTemplate);
  
}


/////////////first page title ////////////////


onFileSelected(event){
  if(event.target.files){
    this.hero_image_file = event.target.files[0];
    this.hero_image_file_name = this.hero_image_file.name;
    var reader = new FileReader();
    reader.readAsDataURL(this.hero_image_file);
    reader.onload = (e: any) => {
      this.hero_image_url = e.target.result;
    }
  }
}
  
  onPublish(){
    // console.log(this.previewTemplate);
    this.blog = this.previewTemplate;
    this.editorForm.value.editor = this.previewTemplate;

  }

////////////////////third page title/////////////////////////

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    // Add our fruit
    if ((value && this.tags.indexOf(value) === -1)) {
      this.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ////////////quill js editor /////////////////
  
  onEditorChanged(event: EditorChangeContent| EditorChangeSelection){
    this.previewTemplate = event.editor.root.innerHTML;
  }

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
   
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
   
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
   
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
   
      ['clean'],                                         // remove formatting button
   
      ['link', 'image', 'video']                         // link and image, video
    ]
  };


  //////// preview page content //////////
  
  onSaveBlog(){
    this.blogService.postBlog(this.blogTemplate);

    this.router.navigate(['/home']);
  }
}

