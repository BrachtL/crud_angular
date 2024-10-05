// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, UserFormComponent, UserListComponent],
})
export class AppComponent implements OnInit {
  title = 'CRUD Application';
  isAuthenticated = false; // Initialize authentication state

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Check if user is authenticated
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }
  }

  handleUserCreated(newUser: any) {
    console.log('New user created:', newUser);
  }
}