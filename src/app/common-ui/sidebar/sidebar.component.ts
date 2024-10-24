import { Component, HostBinding, inject, } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMe, selectUnreadMsg } from '../../data';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, SubscriberCardComponent, RouterLink, AsyncPipe, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  store = inject(Store);
  subscribers$ = this.profileService.getSubscribersShortList(1, 3);
  me = this.store.selectSignal(selectMe)
  unreadMsg = this.store.selectSignal(selectUnreadMsg)

  @HostBinding('class.open')
  isOpened = false
  @HostBinding('class.close')
  isClosed = false

  menu = [
    {
      label: 'Home',
      link: 'profile/me'
    },
    {
      label: 'Chats',
      link: 'chats'
    },
    {
      label: 'Search',
      link: 'search'
    }
  ]

  async ngOnInit() {
    await firstValueFrom(this.profileService.getMe())
    this.chatsService.connectWS();
  }

  openMenu() {
    this.isOpened = true;
    this.isClosed = false;
  }

  closeMenu() {
    this.isOpened = false;
    this.isClosed = true;
  }
}
