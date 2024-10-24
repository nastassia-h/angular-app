import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from "./chat-workspace-header/chat-workspace-header.component";
import { ChatWorkspaceMessagesWrapperComponent } from "./chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component";
import { PostInputComponent } from "../../profile-page/post-input/post-input.component";
import { MessageInputComponent } from "../../../common-ui/message-input/message-input.component";
import { ChatsService } from '../../../data/services/chats.service';
import { ActivatedRoute } from '@angular/router';
import { auditTime, fromEvent, merge, switchMap, tap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [ChatWorkspaceHeaderComponent, ChatWorkspaceMessagesWrapperComponent, PostInputComponent, MessageInputComponent, AsyncPipe],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss'
})
export class ChatWorkspaceComponent implements AfterViewInit {
  activatedRoute = inject(ActivatedRoute);
  chatsService = inject(ChatsService)
  r2 = inject(Renderer2)
  hostElement = inject(ElementRef)

  activeChat$ = this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => {
        return merge(
          this.chatsService.getChatById(id),
  
          // timer(3000, 10000).pipe(
          //   switchMap(() => this.chatsService.getChatById(id))
          // )
        );
      })
    )

    ngAfterViewInit() {
      this.adjustHostHeight()
    }

    constructor() {
      fromEvent(window, 'resize')
        .pipe(
          auditTime(250)
        )
        .subscribe(() => this.adjustHostHeight())
    }
  
    adjustHostHeight() {
      const {top} = this.hostElement.nativeElement.getBoundingClientRect();
      let height = window.innerHeight - top - 25;
      this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
    }
  
}
