// src/app/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).pipe(
      tap((response) => {
        if (response && response.message === 'Login successful') {
          this.router.navigate(['/']);
        }
      }),
      catchError((error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error', error);
        return of(null); // Return an observable of null to keep the stream alive
      })
    ).subscribe(); // Subscribe to execute the observable
  }
}