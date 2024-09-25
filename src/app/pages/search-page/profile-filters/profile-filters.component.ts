import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileFilters } from '../../../data';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  store = inject(Store);

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: this.fb.array([])
  })

  searchFormSub!: Subscription

  constructor() {
    this.searchFormSub = this.form.valueChanges.pipe(
      startWith({}),
      debounceTime(300),
      // switchMap(formValue => {
      //   return this.profileService.filterAccounts(formValue)
      // }),
      //takeUntilDestroyed() // only from angular 17
    )
    .subscribe(formValue => {
      this.store.dispatch(profileActions.filterEvents({filters: formValue}))
      // ngxs
      // this.store.dispatch(new FilterEvents(formValue)); store from ngxs
    })

    const filters = this.store.selectSignal(selectProfileFilters);
    this.form.patchValue(filters());

    const stackArray = filters()?.['stack']; 
    this.stackList.clear(); 
    
    stackArray?.forEach((stackItem: string) => {
      this.stackList.push(new FormControl(stackItem));
    });
  }

  ngOnDestroy(): void {
      this.searchFormSub.unsubscribe()
  }

  newStack = new FormControl('');

  get stackList(): FormArray {
    return this.form.get('stack') as FormArray;
  }

  addStack(event: Event): void {
    event.preventDefault(); 
    const stackName = this.newStack.value?.trim();

    if (stackName && !this.stackList.controls.some(control => control.value === stackName)) {
      this.stackList.push(new FormControl(stackName)); 
      this.newStack.reset(); 
    }
  }

  removeStack(index: number): void {
    this.stackList.removeAt(index);
  }

}
