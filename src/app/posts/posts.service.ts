import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {

    }

    getPosts() {
        this.http.get<{ message: string, results: Post[] }>('http://localhost:3000/api/posts').subscribe((postData) => {
            this.posts = postData.results;
            this.postsUpdated.next([...this.posts]);
        });

    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        this.http.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((data) => {
            console.log(data.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }
}
