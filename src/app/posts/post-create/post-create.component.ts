import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;



  onSavePost(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      const post: Post = {
        id: null,
        title: form.value.title,
        content: form.value.content
      };

      this.postsService.addPost(post);
    } else {
      const post: Post = {
        id: this.postId,
        title: form.value.title,
        content: form.value.content
      };
      this.postsService.updatePost(this.postId, post);
    }
    form.resetForm();
  }




  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
