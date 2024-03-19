import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'mg-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
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

  getErrorMessage() {
    if (this.signupForm.get('email')?.errors?.['required']) {
      return 'Email is required.';
    }
    if (this.signupForm.get('email')?.errors?.['email']) {
      return 'Invalid email format.';
    }
    if (this.signupForm.get('password')?.errors?.['required']) {
      return 'Password is required.';
    }
    return '';
  }

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
    this.userService.addUser({ email } as User).subscribe((user) => {
      if (user) this.router.navigate(['user']);
    });
  }
}