import { Component, Input, Output, inject, Renderer2, input, EventEmitter } from '@angular/core';
import { AvatarCircleComponent } from "../avatar-circle/avatar-circle.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  r2 = inject(Renderer2)
  avatarUrl = input<string | null>();
  inputValue = ''

  @Input() eventName: string = ''; 
  @Output() created = new EventEmitter<{ data: string }>()

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreate() {
    if (this.inputValue === '') return 
    this.created.emit({ data: this.inputValue });
    this.inputValue = '';
  }
}
