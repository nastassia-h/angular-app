import { createActionGroup, props } from "@ngrx/store";
import { Profile } from "../interfaces/profile.interface";

export const profileActions = createActionGroup({
   source: 'profile',
   events: {
      'filter events': props<{filters: Record<string, any>}>(),
      'profiles loaded': props<{profiles: Profile[]}>(),
      'subscribers loaded': props<{profiles: Profile[]}>(),
      'unsubscribe':props<{id: number}>(),
      'subscribe': props<{id: number}>(),
      'subscriptions loaded': props<{profiles: Profile[]}>(),
      'unsubscribe success': props<{id: number}>(),
      'subscribe success': props<{id: number}>(),
      'set page': props<{page?: number}>(),
      'set me': props<{profile: Profile}>(),
      'set unreadMsg': props<{unreadMsg: number}>()
   }
})