import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: any[] = [
    // { title: 'First Post', content: 'First Post content goes here' },
    // { title: 'Second Post', content: 'Second Post content goes here' },
    // { title: 'Third Post', content: 'Third Post content goes here' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
