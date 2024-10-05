import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tt-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => TtInputComponent)
  }]
})
export class TtInputComponent implements ControlValueAccessor {
 
  type = input<'text' | 'password'>('text')
  placeholder = input<string | null>('')

  value: string | null = null;
  disabled = signal<boolean>(false);
  onChange!: (val: string | null) => void;
  onTouched!: () => void;

  writeValue(val: string | null): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  onModelChange(val: string | null) {
    this.onChange(val)
  }
}
