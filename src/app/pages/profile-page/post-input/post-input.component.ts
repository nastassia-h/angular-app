import { Component, EventEmitter, inject, input, Output, Renderer2 } from '@angular/core';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';


@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
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
