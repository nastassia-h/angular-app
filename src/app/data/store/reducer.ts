import { createFeature, createReducer, on } from "@ngrx/store";
import { profileActions } from "./actions";
import { Profile } from "../interfaces/profile.interface";

export interface ProfileState {
   me: Profile | null,
   profiles: Profile[],
   profileFilters: Record<string, any>,
   page: number,
   size: number,
   unreadMsg: number
}

export const initialState: ProfileState = {
   me: null,
   profiles: [],
   profileFilters: {},
   page: 1,
   size: 10,
   unreadMsg: 0
}

export const profileFeature = createFeature({
   name: 'profileFeature',
   reducer: createReducer(
      initialState,
      on(profileActions.setMe, (state, payload) => {
         return {
            ...state,
            me: payload.profile
         }
      }),
      on(profileActions.profilesLoaded, (state, payload) => {
         return {
            ...state,
            profiles: state.profiles.concat(payload.profiles)
         }
      }),
      on(profileActions.filterEvents, (state, payload) => {
         return {
            ...state,
            profileFilters: payload.filters,
            profiles: [],
            page: 1
         }
      }),
      on(profileActions.setPage, (state, payload) => {
         let page = payload.page;
         if (!page) {
            page = state.page + 1;
         }
         return {
            ...state,
            page
         }
      }),
      on(profileActions.setUnreadMsg, (state, payload) => {
         return {
            ...state,
            unreadMsg: payload.unreadMsg
         }
      })
   )
})