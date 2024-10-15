import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, Message, MyChat } from '../interfaces/chat.interface';
import { ProfileService } from './profile.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  #http = inject(HttpClient);
  me = inject(ProfileService).me;
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`

  activeChatMessages = signal<Message[]>([])

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
