import { Component, ElementRef, HostBinding, inject, output, Renderer2, signal } from '@angular/core';
import { ChatsBtnComponent } from "../chats-btn/chats-btn.component";
import { ChatsService } from '../../../data/services/chats.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { auditTime, combineLatest, fromEvent, map, merge, startWith, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [ChatsBtnComponent, AsyncPipe, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  chatsService= inject(ChatsService)
  r2 = inject(Renderer2)
  hostElement = inject(ElementRef)

  filterChatsControl = new FormControl<string>('')

  chats$ = combineLatest([
    timer(0, 200000).pipe(
      switchMap(() => this.chatsService.getMyChats())
    ),
    this.filterChatsControl.valueChanges.pipe( 
      startWith('') 
    )
  ]).pipe(
    map(([chats, inputValue]) => {
      const filteredChats = chats.filter(chat => {
        const chatName = `${chat.userFrom.firstName} ${chat.userFrom.lastName}`.toLowerCase();
        return chatName.includes(inputValue?.toLowerCase() ?? '');
      });
      return filteredChats;
    })
  );

  ngAfterViewInit() {
    this.adjustHostHeight()
  }

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        auditTime(250)
      )
      .subscribe(() => this.adjustHostHeight())
  }

  adjustHostHeight() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    let height = window.innerHeight - top - 25;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
