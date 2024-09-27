import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { PostInputComponent } from "../post-input/post-input.component";
import { PostComponent } from "../post/post.component";
import { PostService } from '../../../data/services/post.service';
import { auditTime, firstValueFrom, fromEvent } from 'rxjs';
import { ProfileService } from '../../../data';
import { CommentService } from '../../../data/services/comment.service';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService)
  commentService = inject(CommentService)
  profileService = inject(ProfileService)
  r2 = inject(Renderer2)
  feed = this.postService.posts
  me = this.profileService.me

  hostElement = inject(ElementRef)

  // @HostListener('window:resize')
  // onWindowResize() {
  //   this.adjustHostHeight();
  // }

  constructor() {
    firstValueFrom(this.postService.fetchPosts())

    fromEvent(window, 'resize')
      .pipe(
        auditTime(500)
      )
      .subscribe(() => this.adjustHostHeight())
  }

  ngAfterViewInit() {
    this.adjustHostHeight()
  }

  adjustHostHeight() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  handlePostCreated(event: { data: string }) {
    firstValueFrom(this.postService.createPost({
      title: 'Test',
      content: event.data,
      authorId: this.profileService.me()!.id
    }))
  }
}
