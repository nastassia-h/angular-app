import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, Message, MyChat } from '../interfaces/chat.interface';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { profileActions, selectMe } from '../store';
import { WSChatsService } from './ws-chats.service';
import { WSMessage } from '../interfaces/ws-message.interface';
import { isErrorWsMessage, isNewWSMessage, isUnreadWSMessage } from '../interfaces/ws-message-guard';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  #http = inject(HttpClient);
  authService = inject(AuthService)
  store = inject(Store);
  me = this.store.selectSignal(selectMe);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`

  activeChatMessages = signal<Message[]>([])

  WSChatsService = new WSChatsService()

  connectWS() {
    this.WSChatsService.connect({
      url: `${this.chatsUrl}ws`,
      token: this.authService.token ?? '',
      handleMessage: this.handleMessage
    })
  }

  handleMessage = (message: WSMessage) => {
    if (isNewWSMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author_id,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,
        }
      ])

      return;
    }

    if (isErrorWsMessage(message)) {
      this.connectWS();
      return;
    }

    if (isUnreadWSMessage(message)) {
      this.store.dispatch(profileActions.setUnreadMsg({unreadMsg: message.data.count}))
      return;
    }
  }

  createChat(userId: number) {
    return this.#http.post<Chat>(`${this.chatsUrl}${userId}`, {})
  }

  getMyChats() {
    return this.#http.get<MyChat[]>(`${this.chatsUrl}get_my_chats/`)
  }

  getChatById(chatId: number) {
    return this.#http.get<Chat>(`${this.chatsUrl}${chatId}`)
      .pipe(
        map(chat => {
          const patchedChat = {
            ...chat,
            companion: chat.userFirst.id === this.me()?.id ? chat.userSecond : chat.userFirst,
            messages: chat.messages.map(message => {
              return {
                ...message,
                user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
                isMine: message.userFromId === this.me()?.id
              }
            })
          };
          this.activeChatMessages.set(patchedChat.messages);
          return patchedChat;
        })
      )
  }

  sendMessage(chatId: number, message: string) {
    return this.#http.post<Message>(`${this.messageUrl}send/${chatId}`, {}, {params: {message}})
  }
}
