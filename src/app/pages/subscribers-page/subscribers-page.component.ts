import { Component, inject } from '@angular/core';
import { profileFeature, ProfileService, selectSubscribers } from '../../data';
import { Store } from '@ngrx/store';
import { SubscriberCardComponent } from "../../common-ui/sidebar/subscriber-card/subscriber-card.component";
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";
import { InfiniteScrollTriggerComponent } from "../../common-ui/infinite-scroll-trigger/infinite-scroll-trigger.component";
import { ProfileFiltersComponent } from "../search-page/profile-filters/profile-filters.component";

@Component({
  selector: 'app-subscribers-page',
  standalone: true,
  imports: [SubscriberCardComponent, RouterLink, AsyncPipe, ProfileCardComponent, InfiniteScrollTriggerComponent, ProfileFiltersComponent],
  templateUrl: './subscribers-page.component.html',
  styleUrl: './subscribers-page.component.scss'
})
export class SubscribersPageComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  subscribers = this.store.selectSignal(selectSubscribers)

  fetchNextPage() {

  }
}
