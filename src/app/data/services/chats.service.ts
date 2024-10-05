import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Chat, Message, MyChat } from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  #http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`

  createChat(userId: number) {
    return this.#http.post<Chat>(`${this.chatsUrl}${userId}`, {})
  }

  getMyChats() {
    return this.#http.get<MyChat[]>(`${this.chatsUrl}get_my_chats/`)
  }

  getChatById(chatId: number) {
    return this.#http.get<Chat>(`${this.chatsUrl}${chatId}`)
  }

  sendMessage(chatId: number, message: string) {
    return this.#http.post<Message>(`${this.messageUrl}send/${chatId}`, {}, {params: {message}})
  }

  
}
