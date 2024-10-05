import { Component, inject } from '@angular/core';
import { ChatsBtnComponent } from "../chats-btn/chats-btn.component";
import { ChatsService } from '../../../data/services/chats.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [ChatsBtnComponent, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  chatsService= inject(ChatsService)

  //chats$ = this.chatsService.getMyChats();

  chats = [
    {
      id: 2,
      userFrom: {
        id: 127,
        username: "tatsiko",
        avatarUrl: "static/avatars/tatsiko.jpg",
        subscribersAmount: 0,
        firstName: "Татьяна",
        lastName: "Конькова",
        isActive: true,
        stack: [],
        city: "sjdh",
        description: "sjhd"
      },
      message: "Test message",
      createdAt: "2024-09-27T21:40:37.517Z"
    }
  ]
}
