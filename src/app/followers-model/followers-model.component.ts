import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-followers-model',
  templateUrl: './followers-model.component.html',
  styleUrls: ['./followers-model.component.css']
})
export class FollowersModelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<FollowersModelComponent> ) { }

  action: string;
  list: String[];

  ngOnInit(): void {
    console.log(this.data);
    this.action = this.data.action;
    this.list = this.data.data;
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
