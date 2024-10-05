import { Component } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from "./chat-workspace-header/chat-workspace-header.component";
import { ChatWorkspaceMessagesWrapperComponent } from "./chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component";
import { PostInputComponent } from "../../profile-page/post-input/post-input.component";
import { MessageInputComponent } from "../../../common-ui/message-input/message-input.component";

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [ChatWorkspaceHeaderComponent, ChatWorkspaceMessagesWrapperComponent, PostInputComponent, MessageInputComponent],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss'
})
export class ChatWorkspaceComponent {

}
