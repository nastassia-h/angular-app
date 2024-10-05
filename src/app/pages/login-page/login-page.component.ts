import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { LoginPayload } from '../../data/interfaces/login.payload.interface';
import { Router } from '@angular/router';
import { TtInputComponent } from "../../common-ui/tt-input/tt-input.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string>(null!, Validators.required),
    password: new FormControl<string>(null!, Validators.required)
  })

  onSubmit(event: Event) {
    const formValue: LoginPayload = this.form.getRawValue() as LoginPayload;

    if (this.form.valid) {
      this.authService.login(formValue).subscribe(res => {
        this.router.navigate([''])
      })
    }
  }
}
