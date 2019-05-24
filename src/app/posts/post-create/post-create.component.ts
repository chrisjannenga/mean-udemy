import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  enteredValue:string = ""
  newPost: string = "";

  onAddPost(){
    this.newPost = this.enteredValue;
  }
}
