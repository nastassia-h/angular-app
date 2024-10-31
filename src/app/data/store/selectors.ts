import { createSelector } from "@ngrx/store";
import { profileFeature } from "./reducer";

export const selectFilteredProfiles = createSelector(
   profileFeature.selectProfiles,
   (profiles) => profiles
)

export const selectSubscriptions = createSelector(
   profileFeature.selectSubscriptions,
   (profiles) => profiles
)

export const selectSubscribers = createSelector(
   profileFeature.selectSubscribers,
   (profiles) => profiles
)

export const selectProfileFilters = createSelector(
   profileFeature.selectProfileFilters,
   (filters) => filters
)

export const selectProfilePageable = createSelector(
   profileFeature.selectProfileFeatureState,
   (state) => {
      return {
         page: state.page,
         size: state.size
      }
   }
)

export const selectMe = createSelector(
   profileFeature.selectMe,
   (me) => me
)

export const selectUnreadMsg = createSelector(
   profileFeature.selectUnreadMsg,
   (unreadMsg) => unreadMsg
)