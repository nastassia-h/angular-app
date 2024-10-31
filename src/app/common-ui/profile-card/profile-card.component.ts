import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';
import { profileActions } from '../../data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  store = inject(Store)
  @Input() profile!: Profile;

  subscribe(id: number) {
    this.store.dispatch(profileActions.subscribe({id}))
  }

  unsubscribe(id: number) {
    this.store.dispatch(profileActions.unsubscribe({id}))
  }
}
