import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterPayload } from '../../data/interfaces/register.payload.interface';
import { TtInputComponent } from '../../common-ui/tt-input/tt-input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [TtInputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)
  isPasswordConfirmVisible = signal<boolean>(false)

  form = new FormGroup({
    firstname: new FormControl<string>('', Validators.required),
    lastname: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
    city: new FormControl<string>(''),
    password: new FormControl<string>('', Validators.required),
    passwordConfirm: new FormControl<string>('', Validators.required)
  })

  onSubmit(event: Event) {
    const formValue: RegisterPayload = this.form.getRawValue() as RegisterPayload;

    if (this.form.valid) {
      // this.authService.register(formValue).subscribe(res => {
      //   this.router.navigate([''])
      // })
    }
  }
}
