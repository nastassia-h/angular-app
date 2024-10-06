import { Component, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TtInputComponent } from "../tt-input/tt-input.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AddressService } from '../../data/services/address.service';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [TtInputComponent, ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(()=>AddressInputComponent)
  }]
})

export class AddressInputComponent implements ControlValueAccessor {

  onChange = (val: string) => {}
  onTouched = () => {}

  innerSearchControl = new FormControl<string>('');
  #dadataService = inject(AddressService);

  isDropdownOpened = signal<boolean>(false);
  disabled = false

  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(val => {
        return this.#dadataService.getSuggestions(val ?? '')
          .pipe(
            tap(res => {
              this.isDropdownOpened.set(!!res.length)
            })
          )
      })
    )

  writeValue(val: string): void {
    this.innerSearchControl.patchValue(val, {emitEvent: false})
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onSuggestionPick(val: string) {
    this.writeValue(val)
    this.onChange(val)
    this.isDropdownOpened.set(false)
  }

}
