import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient,
                private notifier: NotifierService) {

    }

    getPosts() {
        this.http.get<{ message: string, results: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.results.map(post => {
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content
                    };
                });
            })).subscribe(transformedPosts => {
                this.posts = transformedPosts;
                this.postsUpdated.next([...this.posts]);
            });

    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post).subscribe(data => {
            console.log(data.message);
            const postId = data.postId;
            post.id = postId;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.notifier.notify('success', 'Your post was added!')
        });
    }

    deletePost(postId: string) {
        console.log(postId);
        this.http.delete(`http://localhost:3000/api/posts/${postId}`).subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId)
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.notifier.notify('error', 'Your post was deleted!')
        });
    }

}
