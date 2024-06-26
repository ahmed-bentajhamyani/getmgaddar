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

  error: string = '';

  getErrorMessage() {
    if (this.signupForm.get('email')?.errors?.['required']) {
      return 'Email is required.';
    }
    if (this.signupForm.get('email')?.errors?.['email']) {
      return 'Invalid email format.';
    }
    return '';
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signup(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value);
    }
  }

  async signup(email: string, password: string) {
    this.authService.signup(email, password)
      .then(
        () => {
          console.log('signedUp')
          this.addUser(email);
        }
      )
      .catch((error) => {
        this.error = error.message.replace("Firebase: ", "");
      });
  }

  addUser(email: string) {
    this.userService.addUser({ email, name: 'Unknown', age: 0, height: 0, weight: 0, targetWeight: 0 } as User).subscribe((user) => {
      if (user) this.router.navigate(['user']);
    });
  }
}