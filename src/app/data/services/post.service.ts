import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Post, PostCreateDto } from "../interfaces/post.interface";
import { switchMap, tap } from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class PostService {
   #http = inject(HttpClient)
   baseApiUrl = 'https://icherniakov.ru/yt-course/post/'

   posts = signal<Post[]>([])


   createPost(payload: PostCreateDto) {
      return this.#http.post<Post>(this.baseApiUrl, payload)
         .pipe(
            switchMap(() => {return this.fetchPosts()})
         )
   }

   fetchPosts() {
      return this.#http.get<Post[]>(this.baseApiUrl)
         .pipe(
            tap(res => this.posts.set(res.reverse()))
         )
   }

   createLike(postId: number) {
      return this.#http.post<string>(`${this.baseApiUrl}like/${postId}`, {})
         .pipe(
            tap(res => {
               const updatedPosts = this.posts().map(post => {
                  if (post.id === postId) {
                     post.likes += 1;
                  }
                  return post;
               })
               this.posts.set(updatedPosts)
            })
         )
   }

   deleteLike(postId: number) {
      return this.#http.delete<string>(`${this.baseApiUrl}like/${postId}`)
         .pipe(
            tap(res => {
               const updatedPosts = this.posts().map(post => {
                  if (post.id === postId) {
                     post.likes -= 1;
                  }
                  return post;
               })
               this.posts.set(updatedPosts)
            })
         )
   }
}