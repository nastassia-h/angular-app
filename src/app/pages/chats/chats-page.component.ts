import { Component, HostBinding, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ChatsListComponent } from "./chats-list/chats-list.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss'
})
export class ChatsPageComponent  {
  router = inject(Router);

  @HostBinding('class.opened')
  isOpened = true;

  constructor() {
    this.isOpened = this.router.url === '/chats';

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((val) => {
        this.isOpened = val.url === '/chats'
      });
  }
}
