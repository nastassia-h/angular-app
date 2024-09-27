import { Profile } from "./profile.interface"
import { Comment } from "./comment.interface"

export interface PostCreateDto {
   title: string,
   content: string
   authorId: number,
}

export interface Post {
   id: number,
   title: string,
   communityId: number,
   content: string,
   author: Profile,
   images: string[],
   createdAt: string,
   updatedAt: string,
   likes: number,
   comments: Comment[]
}