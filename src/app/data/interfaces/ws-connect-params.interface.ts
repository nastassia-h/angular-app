import { WSMessage } from "./ws-message.interface";

export interface WSConnectParams {
   url: string,
   token: string,
   handleMessage(message: WSMessage): void
}