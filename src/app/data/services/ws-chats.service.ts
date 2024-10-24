import { Injectable } from "@angular/core";
import { WSConnectParams } from "../interfaces/ws-connect-params.interface";
import { WSChatsServiceInterface } from "../interfaces/ws-chats-service.interface";

@Injectable({
   providedIn: 'root'
})
export class WSChatsService implements WSChatsServiceInterface {

   WSConnection: WebSocket | null = null;

   connect(params: WSConnectParams) {
      if (!this.WSConnection) {
         this.WSConnection = new WebSocket(params.url, [params.token])
      } 

      this.WSConnection.onmessage = (event: MessageEvent) => {
         params.handleMessage(JSON.parse(event.data))
      }

      this.WSConnection.onclose = (event: Event) => {
         console.log('Connection is closed')
      }
   }

   sendMessage(text: string, chatId: number) {
      this.WSConnection?.send(JSON.stringify({text, chat_id: chatId}))
   }

   disconnect() {
      this.WSConnection?.close();
   }
}