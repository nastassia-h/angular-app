import { inject, Injectable } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { profileActions } from "./actions";
import { switchMap } from "rxjs";
import { map } from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class ProfileEffects {
   profileService = inject(ProfileService);
   actions$ = inject(Actions);

   filterProfiles = createEffect(() => {
      return this.actions$.pipe(
         ofType(profileActions.filterEvents),
         switchMap(({filters}) => {
            return this.profileService.filterAccounts(filters)
         }),
         map(res => profileActions.profilesLoaded({profiles: res.items}))
      )
   })
}