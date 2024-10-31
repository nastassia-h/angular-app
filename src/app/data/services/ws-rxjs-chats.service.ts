import { Injectable } from "@angular/core";
import { WSConnectParams } from "../interfaces/ws-connect-params.interface";
import { WSChatsServiceInterface } from "../interfaces/ws-chats-service.interface";
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { WSMessage } from "../interfaces/ws-message.interface";
import { finalize, Observable, tap } from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class WSRxjsChatsService implements WSChatsServiceInterface {

   #socket: WebSocketSubject<WSMessage> | null = null

   connect(params: WSConnectParams): Observable<WSMessage> {
      if (!this.#socket) {
         this.#socket = webSocket({
            url: params.url,
            protocol: [params.token]
         })
      } 

      return this.#socket.asObservable()
         .pipe(
            tap(message => params.handleMessage(message)),
            finalize(() => console.log('Close connection'))
         )
   }

   sendMessage(text: string, chatId: number): void {
      this.#socket?.next({text, chat_id: chatId})
   }

   disconnect(): void {
      this.#socket?.complete();
   }
}