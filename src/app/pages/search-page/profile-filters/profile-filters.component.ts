import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileFilters } from '../../../data';
import { StackInputComponent } from "../../../common-ui/stack-input/stack-input.component";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule, StackInputComponent],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  store = inject(Store);

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [[] as string[]]
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

      // ngrx signal store
      // this.store.filterProjects(formValue)
    })

    const filters = this.store.selectSignal(selectProfileFilters);
    this.form.patchValue(filters());
  }

  ngOnDestroy(): void {
      this.searchFormSub.unsubscribe()
  }
}
