import { Component, input, OnInit, signal, inject, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { DateDeltaPipe } from '../../../helpers/pipes/date-delta.pipe';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { Comment } from '../../../data/interfaces/comment.interface';
import { CommentService } from '../../../data/services/comment.service';
import { firstValueFrom } from 'rxjs';
import { ProfileService, selectMe } from '../../../data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarCircleComponent, DateDeltaPipe, PostInputComponent, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<Comment[]>([]); 
  store = inject(Store);
  commentService = inject(CommentService);
  profileService = inject(ProfileService);

  me = this.store.selectSignal(selectMe);
  isCommentsOpened = signal<boolean>(false);


  @Output() created = new EventEmitter<{data: {postId: number, text: string}}>()

  ngOnInit() {
    this.comments.set(this.post()!.comments)   
  }

  handleCommentCreate(event: {data: string}) {
    firstValueFrom(this.commentService.createComment({
      text: event.data,
      authorId: this.me()!.id,
      postId: this.post()!.id,
      commentId: null,
    })).then(() => this.fetchPostComments())
  }

  async fetchPostComments() {
    const comments = await firstValueFrom(this.commentService.getCommentsByPost(this.post()!.id))
    this.comments.set(comments)
  }

  toggleComments() {
    this.isCommentsOpened.set(!this.isCommentsOpened());
  }
}
