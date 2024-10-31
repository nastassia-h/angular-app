export interface Profile {
   id: number,
   username: string,
   avatarUrl: string | null,
   subscribersAmount: number,
   firstName: string,
   lastName: string,
   description: string,
   isActive: boolean,
   stack: string[],
   city: string,
   isSubscriber?: boolean,
   isSubscpription?: boolean, 
}

export interface ProfileShort {
   id: number,
   username: string,
   avatarUrl: string,
   subscribersAmount: number
}