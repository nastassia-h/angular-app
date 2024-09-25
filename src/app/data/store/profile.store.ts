import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Profile } from '../interfaces/profile.interface';
import { ProfileService } from '../services/profile.service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';


type ProfileStateType = {
   profiles: Profile[],
   profileFilters: Record<string, any>
}

const initialState: ProfileStateType = {
   profiles: [],
   profileFilters: {}
}

export const profileStore = signalStore(
   withState(initialState),
   withComputed(({profiles}) => {
      return {
         profiles2: computed(() => profiles().map(pr => ({...pr, lastName: 'BLA BLA'})))
      }
   }),
   withMethods((state, profileService = inject(ProfileService)) => {

      const filterProfiles = rxMethod<Record<string, any>>(
         pipe(
            switchMap(filters => {
               return profileService.filterAccounts(filters)
                  .pipe(
                     tap(res => patchState(state, {profiles: res.items}))
                  )
            })
         )
      )
      return {
         filterProfiles 
      }
   }),
   withHooks({
      onInit(store) {
         store.filterProfiles({})
      }
   })
)