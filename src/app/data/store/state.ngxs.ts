import { Injectable, inject } from "@angular/core"
import { Profile } from "../interfaces/profile.interface"
import { Action, Selector, State, StateContext } from "@ngxs/store"
import { FilterEvents } from "./actions.ngxs"
import { Observable, tap } from "rxjs"
import { ProfileService } from "../services/profile.service"
import { Pageble } from "../interfaces/pageble.interface"

export interface ProfileStateModel {
   profiles: Profile[],
   profileFilters: Record<string, any>
}

@State({
   name: 'profileState',
   defaults: {
      profiles: [],
      profileFilters: {}
   }
})
@Injectable()
export class ProfileState {
   #profileService = inject(ProfileService);

   @Selector()
   static getProfiles(state: ProfileStateModel): Profile[] {
      return state.profiles;
   }

   @Action(FilterEvents)
   onFilterEvents(ctx: StateContext<ProfileStateModel>, {filters}: FilterEvents): Observable<Pageble<Profile>> {
      return this.#profileService.filterAccounts(filters).pipe(
         tap(res => {
            ctx.patchState({
               profiles: res.items
            })
         })
      )
   }
}