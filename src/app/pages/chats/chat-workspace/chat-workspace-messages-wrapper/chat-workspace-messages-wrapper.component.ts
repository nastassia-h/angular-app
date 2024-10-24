import { AfterViewInit, Component, ElementRef, inject, input, OnDestroy, signal, ViewChild } from '@angular/core';
import { ChatWorkspaceMessageComponent } from "./chat-workspace-message/chat-workspace-message.component";
import { MessageInputComponent } from '../../../../common-ui/message-input/message-input.component';
import { Chat } from '../../../../data/interfaces/chat.interface';
import { ChatsService } from '../../../../data/services/chats.service';
import { firstValueFrom } from 'rxjs';
import moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, DatePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit, OnDestroy  {
  chatsService = inject(ChatsService);
  
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  #mutationObserver!: MutationObserver;
  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;
  startDate: string | null = null

  ngAfterViewInit(): void {
    const container = this.messagesContainer.nativeElement;
    container.scrollTop = container.scrollHeight
    this.#mutationObserver = new MutationObserver(() => {
      container.scrollTop = container.scrollHeight
    })
    this.#mutationObserver.observe(container, {childList: true, subtree: true})
  }

  ngOnDestroy() {
    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }
  }

  async createMessage(event: {data: string}, chatId: number) {
    this.chatsService.WSChatsService.sendMessage(event.data, chatId);

    //await firstValueFrom(this.chatsService.sendMessage(chatId, event.data));
    await firstValueFrom(this.chatsService.getChatById(this.chat()?.id));
  }

  isNewDay(date: string): boolean {
    const currentMoment = moment.utc(this.startDate).startOf('day');
    const newMoment = moment.utc(date).startOf('day');

    const isNewDay = !currentMoment.isSame(newMoment, 'day');

    if (isNewDay) {
      this.startDate = date;  
    }

    return isNewDay;
  }
}
