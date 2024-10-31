import { createFeature, createReducer, on } from "@ngrx/store";
import { profileActions } from "./actions";
import { Profile } from "../interfaces/profile.interface";

export interface ProfileState {
   me: Profile | null,
   profiles: Profile[],
   profileFilters: Record<string, any>,
   subscribers: Profile[],
   subscriptions: Profile[],
   page: number,
   size: number,
   unreadMsg: number
}

export const initialState: ProfileState = {
   me: null,
   profiles: [],
   profileFilters: {},
   subscribers: [],
   subscriptions: [],
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
         const patchedProfiles = payload.profiles.map(profile => {
            let isSubscriber = state.subscribers.filter(sub => sub.id === profile.id).length > 0
            let isSubscpription = state.subscriptions.filter(sub => sub.id === profile.id).length > 0
            return {
               ...profile,
               isSubscpription: isSubscpription,
               isSubscriber: isSubscriber
            }
         })
         return {
            ...state,
            profiles: state.profiles.concat(patchedProfiles)
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
      on(profileActions.subscribersLoaded, (state, payload) => {
         const patchedSubscribers = payload.profiles.map(profile => {
            let isSubscpription = state.subscriptions.filter(sub => sub.id === profile.id).length > 0
            return {
               ...profile,
               isSubscpription: isSubscpription,
               isSubscriber: true
            }
         })
         return {
            ...state,
            subscribers: state.subscribers.concat(patchedSubscribers)
         }
      }),
      on(profileActions.subscriptionsLoaded, (state, payload) => {
         const patchedSubscriptions = payload.profiles.map(profile => {
            let isSubscriber = state.subscribers.filter(sub => sub.id === profile.id).length > 0
            return {
               ...profile,
               isSubscpription: true,
               isSubscriber: isSubscriber
            }
         })
         return {
            ...state,
            subscriptions: state.subscriptions.concat(patchedSubscriptions)
         }
      }),
      on(profileActions.subscribeSuccess, (state, { id }) => {
         const updatedProfiles = state.profiles.map(profile =>
            profile.id === id ? { ...profile, isSubscpription: true, subscribersAmount: profile.subscribersAmount + 1 } : profile
         );

         const updatedSubscribers = state.subscribers.map(profile =>
            profile.id === id ? { ...profile, isSubscpription: true, subscribersAmount: profile.subscribersAmount + 1 } : profile
         );

         const newSubscription = updatedProfiles.find(profile => profile.id === id);

         return {
            ...state,
            profiles: updatedProfiles,
            subscribers: updatedSubscribers,
            subscriptions: newSubscription
               ? [...state.subscriptions, newSubscription]
               : state.subscriptions
         };
      }),
      on(profileActions.unsubscribeSuccess, (state, { id }) => {
         const updatedProfiles = state.profiles.map(profile =>
            profile.id === id ? { ...profile, isSubscpription: false, subscribersAmount: profile.subscribersAmount - 1 } : profile
         );

         const updatedSubscribers = state.subscribers.map(profile =>
            profile.id === id ? { ...profile, isSubscpription: false, subscribersAmount: profile.subscribersAmount - 1 } : profile
         );

         return {
            ...state,
            profiles: updatedProfiles,
            subscribers: updatedSubscribers,
            subscriptions: state.subscriptions.filter(sub => sub.id !== id)
         };
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