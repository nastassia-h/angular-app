import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Profile } from '../../data/interfaces/profile.interface';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";
import { StackInputComponent } from "../../common-ui/stack-input/stack-input.component";
import { AddressInputComponent } from "../../common-ui/address-input/address-input.component";
import { Store } from '@ngrx/store';
import { selectMe } from '../../data';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, ReactiveFormsModule, AvatarUploadComponent, StackInputComponent, AddressInputComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  me = this.store.selectSignal(selectMe)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  profile$ = toObservable(this.me);

  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [[] as string[]],
    //address: [{city: 'Katowice', street: 'SJHdh', building: 'sdhjsd'}],
    //city: ['', Validators.required]
  })

  constructor() {
    effect(() => {
      const profile = this.me();
      if (profile) {
        this.form.patchValue(profile)
      }
    })
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    const formValue: Partial<Profile> = this.form.getRawValue() as Partial<Profile>;

    firstValueFrom(this.profileService.patchProfile(formValue))
  }
}
