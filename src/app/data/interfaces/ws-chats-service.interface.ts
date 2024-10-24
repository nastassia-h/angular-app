import { WSConnectParams } from "./ws-connect-params.interface";

export interface WSChatsServiceInterface {
   connect(params: WSConnectParams): void;
   sendMessage(text: string, chatId: number): void;
   disconnect(): void;
}