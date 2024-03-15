import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user';

@Component({
  selector: 'mg-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
  template: `
  <section class="flex justify-center items-center h-screen">
    <div class="flex flex-col justify-center items-center w-1/4 p-12 rounded-lg shadow-md">
      <p class="font-bold text-4xl mb-8">Signup</p>
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="flex flex-col w-full">
          <div class="mb-4">
              <label for="email" class="text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" formControlName="email"
                    class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-rose-500">
              <div *ngIf="signupForm.get('email')?.invalid && signupForm.get('email')?.touched"
                  class="text-red-500 text-sm mt-1">
                  <div *ngIf="signupForm.get('email')?.errors?.['required']">Email is required.</div>
                  <div *ngIf="signupForm.get('email')?.errors?.['email']">Invalid email format.</div>
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
              <div *ngIf="signupForm.get('password')?.invalid && signupForm.get('password')?.touched"
                  class="text-red-500 text-sm mt-1">
                  <div *ngIf="signupForm.get('password')?.errors?.['required']">Password is required.</div>
              </div>
          </div>
          <button type="submit" class="w-full bg-rose-500 text-white shadow-md py-3 mb-4 rounded-md hover:bg-rose-700 disabled:bg-rose-200 transition-all ease-in-out duration-300" [disabled]="signupForm.invalid">Signup
          </button>
          <p class="text-sm">Already have an account? <a routerLink="/auth/login" class="cursor-pointer text-blue-500 underline select-none">Login</a></p>
      </form>
    </div>
  </section>
  `,
})
export class SignupComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  hide = true;

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.signup(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value);
    }
  }

  signup(email: string, password: string) {
    this.authService.signup(email, password)
      .then(
        () => {
          console.log('signedUp')
          this.addUser(email);
        }
      );
  }

  addUser(email: string) {
    this.userService.addUser({ email } as User).subscribe(() => this.router.navigate(['user']))
  }
}
