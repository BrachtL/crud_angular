// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, 
  imports: [CommonModule, RouterModule, UserFormComponent, UserListComponent], 
})
export class AppComponent {
  title = 'CRUD Application';

  handleUserCreated(newUser: any) {
    console.log('New user created:', newUser);
  }
}