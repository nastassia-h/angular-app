export interface BaseWSMessage {
   status: 'success' | 'error'
}

export interface NewWSMessage extends BaseWSMessage {
   action: 'message',
   data: {
      id: number,
      message: string,
      chat_id: number,
      created_at: string,
      author_id: number
   }
}

export interface UnreadWSMessage extends BaseWSMessage {
   action: 'unread',
   data: {
      count: number
   }
}

export interface ErrorWSMessage extends BaseWSMessage {
   message: string
}

export interface sendWSMessage {
   status?: string,
   text: string,
   chat_id: number
}

export type WSMessage = NewWSMessage | UnreadWSMessage | ErrorWSMessage | sendWSMessage