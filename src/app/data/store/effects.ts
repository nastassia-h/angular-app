import { inject, Injectable } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { profileActions } from "./actions";
import { lastValueFrom, switchMap, withLatestFrom } from "rxjs";
import { map } from "rxjs";
import { Store } from "@ngrx/store";
import { selectFilteredProfiles, selectProfileFilters, selectProfilePageable } from "./selectors";

@Injectable({
   providedIn: 'root'
})
export class ProfileEffects {
   profileService = inject(ProfileService);
   actions$ = inject(Actions);
   store = inject(Store)

   filterProfiles = createEffect(() => {
      return this.actions$.pipe(
         ofType(
            profileActions.filterEvents,
            profileActions.setPage
         ),
         withLatestFrom(
            this.store.select(selectProfileFilters),
            this.store.select(selectProfilePageable)
         ),
         switchMap(([_, filters, pageable]) => {
            return this.profileService.filterAccounts({...filters, ...pageable})
         }),
         map(res => profileActions.profilesLoaded({profiles: res.items}))
      )
   })
}