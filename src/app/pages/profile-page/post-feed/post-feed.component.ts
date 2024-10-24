import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { PostInputComponent } from "../post-input/post-input.component";
import { PostComponent } from "../post/post.component";
import { PostService } from '../../../data/services/post.service';
import { auditTime, firstValueFrom, fromEvent } from 'rxjs';
import { selectMe } from '../../../data';
import { CommentService } from '../../../data/services/comment.service';
import { Store } from '@ngrx/store';

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
  store = inject(Store)
  r2 = inject(Renderer2)
  feed = this.postService.posts
  me = this.store.selectSignal(selectMe)

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
    let height = window.innerHeight - top - 24 - 24;
    height = (window.innerWidth < 1200) ? height + top : height
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  handlePostCreated(event: { data: string }) {
    firstValueFrom(this.postService.createPost({
      title: 'Test',
      content: event.data,
      authorId: this.me()!.id
    }))
  }
}
