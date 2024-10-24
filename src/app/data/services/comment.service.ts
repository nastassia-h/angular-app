import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comment, CommentCreateDto } from "../interfaces/comment.interface";
import { PostService } from "./post.service";
import { Post } from "../interfaces/post.interface";
import { map } from "rxjs";


@Injectable({
   providedIn: 'root'
})
export class CommentService {
   #http = inject(HttpClient);
   baseApiUrl = 'https://icherniakov.ru/yt-course/comment/'

   postService = inject(PostService);
   posts = this.postService.posts

   createComment(payload: CommentCreateDto) {
      return this.#http.post<Comment>(this.baseApiUrl, payload)
   }

   getCommentsByPost(id: number) {
      return this.#http.get<Post>(`https://icherniakov.ru/yt-course/post/` + id)
         .pipe(
            map(res => res.comments)
         )
   }
}