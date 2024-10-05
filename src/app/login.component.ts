// src/app/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

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
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.access_token) {
          this.router.navigate(['/']); // Navigate to the main page after successful login
        }
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.'; // Handle error message for invalid credentials
        console.error('Login error', error); // Log the error for debugging
      }
    );
  }
}