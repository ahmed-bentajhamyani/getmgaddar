import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'mg-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    NgIf
  ],
  template: `
  <section class="flex justify-center items-center h-screen">
    <div class="flex flex-col justify-center items-center w-1/4 p-12 rounded-lg shadow-md">
      <p class="font-bold text-4xl mb-8">Login</p>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col w-full max-w-xs">
        <div class="mb-4">
            <label for="email" class="text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" formControlName="email"
                  class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-rose-500">
            <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                class="text-red-500 text-sm mt-1">
                <div *ngIf="loginForm.get('email')?.errors?.['required']">Email is required.</div>
                <div *ngIf="loginForm.get('email')?.errors?.['email']">Invalid email format.</div>
            </div>
        </div>
        <div class="mb-4">
            <label for="password" class="text-sm font-medium text-gray-700">Password:</label>
            <div class="relative">
                <input type="{{ hide ? 'password' : 'text' }}" id="password" formControlName="password"
                      class="mt-1 p-2 pr-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-rose-500">
                <button mat-icon-button matSuffix (click)="hide = !hide"
                        [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide"
                        class="absolute inset-y-0 right-0 px-3 py-2 bg-transparent text-gray-600">
                    <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
            </div>
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                class="text-red-500 text-sm mt-1">
                <div *ngIf="loginForm.get('password')?.errors?.['required']">Password is required.</div>
            </div>
        </div>
        <button type="submit" class="w-full bg-rose-500 text-white shadow-md py-3 mb-4 rounded-md hover:bg-rose-700 disabled:bg-rose-200 transition-all ease-in-out duration-300" [disabled]="loginForm.invalid">Login</button>
        <p class="text-sm">Don't have an account? <a routerLink="/auth/signup" class="cursor-pointer text-blue-500 underline select-none">Signup</a></p>
      </form>
    </div>
  </section>
  `,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

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
