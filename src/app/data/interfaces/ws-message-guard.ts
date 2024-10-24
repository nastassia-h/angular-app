import { ErrorWSMessage, NewWSMessage, UnreadWSMessage, WSMessage } from "./ws-message.interface"

export function isNewWSMessage(message: WSMessage): message is NewWSMessage {
   return 'action' in message && message.action === 'message'
}

export function isUnreadWSMessage(message: WSMessage): message is UnreadWSMessage {
   return 'action' in message && message.action === 'unread'
}

export function isErrorWsMessage(message: WSMessage): message is ErrorWSMessage {
   return message.status === 'error'
}