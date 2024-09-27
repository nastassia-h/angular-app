import { ProfileShort } from "./profile.interface"

export interface CommentCreateDto {
     text: string,
     authorId: number,
     postId: number,
     commentId: number | null
}

export interface Comment {
     id: number,
     text: string,
     author: ProfileShort,
     postId: number,
     commentId: number,
     createdAt: string,
     updatedAt: string
}