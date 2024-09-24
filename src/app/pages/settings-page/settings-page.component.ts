import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Profile } from '../../data/interfaces/profile.interface';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  profile$ = toObservable(this.profileService.me);

  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: this.fb.array([])
  })

  newStack = new FormControl('');

  constructor() {
    effect(() => {
      const profile = this.profileService.me();
      this.form.patchValue({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        username: profile?.username,
        description: profile?.description,
      });

      const stackArray = this.profileService.me()?.stack; 
      this.stackList.clear(); 
      
      stackArray?.forEach((stackItem: string) => {
        this.stackList.push(new FormControl(stackItem));
      });
    })
  }

  get stackList(): FormArray {
    return this.form.get('stack') as FormArray;
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
