import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  editorForm: FormGroup;
  previewTemplate = '';
  blog = '';

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  
  onEditorChanged(event: EditorChangeContent| EditorChangeSelection){
    this.previewTemplate = event.editor.root.innerHTML;
  }

  onSubmit(){
  }
  
  onPublish(){
    // console.log(this.previewTemplate);
    this.blog = this.previewTemplate;
    this.blogService.postBlog({
      'author':'haunt',
      'comments': [{
        'message': 'braavoo',
        'author': 'bingo'
      }],
      'image': 'https://media.gettyimages.com/photos/rumi-darwaza-against-sky-at-dusk-picture-id601026785?s=612x612',
      'title': 'Lucknow Diaries',
      'description': this.previewTemplate
    })

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
