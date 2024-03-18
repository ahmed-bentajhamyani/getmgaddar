import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'mg-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  getErrorMessage() {
    if (this.loginForm.get('email')?.errors?.['required']) {
      return 'Email is required.';
    }
    if (this.loginForm.get('email')?.errors?.['email']) {
      return 'Invalid email format.';
    }
    if (this.loginForm.get('password')?.errors?.['required']) {
      return 'Password is required.';
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    }
  }

  login(email: string, password: string) {
    this.authService.login(email, password)
      .then(
        () => {
          console.log('loggedIn')
          this.router.navigate(['user'])
        }
      );
  }
}
