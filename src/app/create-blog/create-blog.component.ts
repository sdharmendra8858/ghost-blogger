import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'; 

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatChipInputEvent } from '@angular/material/chips';

import { BlogService } from '../services/blog.service';
import { Blog } from '../shared/blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateBlogComponent implements OnInit {

  constructor(private blogService: BlogService, private _formBuilder: FormBuilder) {}

  blogTemplate: Blog = {
    'title' : '',
    'author': '',
    'comments': [],
    'description': '',
    'image': '',
    'tags': []
  };

  ////////   quill editor
  previewTemplate = '';
  blog = '';

  ////////   section one title
  hero_image_file_name = "";
  hero_image_file : File = null;
  hero_image_url: String = "";
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
      hero_image: ['']
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


/////////////first page title ////////////////

  onFileSubmit(){
    console.log(this.hero_image_file);
    
  }

  onTitleSubmit(titleForm: NgForm){
    console.log(titleForm);
    
  }
  
  onPublish(){
    console.log(this.previewTemplate);
    this.blog = this.previewTemplate;
    this.blogService.postBlog({
      'author':'haunt',
      'comments': [{
        'message': 'braavoo',
        'author': 'bingo'
      }],
      'image': 'https://media.gettyimages.com/photos/rumi-darwaza-against-sky-at-dusk-picture-id601026785?s=612x612',
      'title': 'Lucknow Diaries',
      'tags': ["yoo"],
      'description': this.previewTemplate
    })

  }




////////////////////third page title/////////////////////////

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value.trim() && this.tags.indexOf(value.trim()) === -1)) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagsFormGroup.setValue(null);
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

}
