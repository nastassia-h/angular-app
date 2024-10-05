import { Component, forwardRef, HostBinding, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RatingInputComponent)
  }]
})
export class RatingInputComponent implements ControlValueAccessor {

  stars: boolean[] = Array(5).fill(false);

  
  @HostBinding('class.disabled')
  disabled = false
  

  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0)
    }, 0)
  }

  onChange = (value: number) => {};
  onTouched = () => {}; 

  // write value to the DOM element
  writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => rating > i);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  // update the form model with new value when value propogates from the view
  rate(index: number) {
    if (this.disabled) return;
    this.onTouched();
    const rating = this.value >= index ? (index - 1) : index
    this.writeValue(rating)
    this.onChange(this.value)
  }
}
