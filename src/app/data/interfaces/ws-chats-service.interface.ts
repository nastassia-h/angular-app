import { Observable } from "rxjs";
import { WSConnectParams } from "./ws-connect-params.interface";
import { WSMessage } from "./ws-message.interface";

export interface WSChatsServiceInterface {
   connect(params: WSConnectParams): void | Observable<WSMessage>;
   sendMessage(text: string, chatId: number): void;
   disconnect(): void;
}