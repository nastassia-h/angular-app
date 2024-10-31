export interface RegisterPayload {
   firstname: string,
   lastname: string,
   username: string,
   city?: string,
   password: string,
   passwordConfirm: string
}