import { Component, inject } from '@angular/core';
import { profileFeature, ProfileService, selectSubscriptions } from '../../data';
import { Store } from '@ngrx/store';
import { ProfileFiltersComponent } from "../search-page/profile-filters/profile-filters.component";
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { InfiniteScrollTriggerComponent } from "../../common-ui/infinite-scroll-trigger/infinite-scroll-trigger.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-subscribtion-page',
  standalone: true,
  imports: [ProfileFiltersComponent, ProfileCardComponent, InfiniteScrollTriggerComponent, AsyncPipe],
  templateUrl: './subscribtion-page.component.html',
  styleUrl: './subscribtion-page.component.scss'
})
export class SubscribtionPageComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  subscriptions = this.store.selectSignal(selectSubscriptions)

  fetchNextPage() {}
}
