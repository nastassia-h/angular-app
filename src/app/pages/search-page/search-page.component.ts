import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '../../data';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent, AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  // ngxs
  // profiles = this.store.selectSignal(ProfileState.getProfiles); store from ngxs

  //ngrx signal store
  // profiles = this.store.profiles; store = inject(ProfileStore)

  constructor() {
    
  }
}
