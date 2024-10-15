import { AfterViewInit, Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { ChatWorkspaceMessageComponent } from "./chat-workspace-message/chat-workspace-message.component";
import { MessageInputComponent } from '../../../../common-ui/message-input/message-input.component';
import { Chat } from '../../../../data/interfaces/chat.interface';
import { ChatsService } from '../../../../data/services/chats.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit  {
  chatsService = inject(ChatsService);
  
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;

  ngAfterViewInit(): void {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }

  async createMessage(event: {data: string}, chatId: number) {
    await firstValueFrom(this.chatsService.sendMessage(chatId, event.data));
    await firstValueFrom(this.chatsService.getChatById(this.chat()?.id));
  }
}
