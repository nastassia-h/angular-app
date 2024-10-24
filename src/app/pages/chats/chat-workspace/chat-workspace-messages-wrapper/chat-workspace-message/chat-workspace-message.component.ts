import {  Component, HostBinding, inject, input } from '@angular/core';
import { Message } from '../../../../../data/interfaces/chat.interface';
import { selectMe } from '../../../../../data';
import { AvatarCircleComponent } from "../../../../../common-ui/avatar-circle/avatar-circle.component";
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
})
export class ChatWorkspaceMessageComponent  {
  message = input.required<Message>();
  store = inject(Store);
  me = this.store.selectSignal(selectMe);

  @HostBinding('class.right')
  get right() {
    return this.message().isMine
  }
}
