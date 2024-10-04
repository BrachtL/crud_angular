// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserFormComponent } from './users/user-form/user-form.component'; // Import UserFormComponent
import { UserListComponent } from './users/user-list/user-list.component'; // Import UserListComponent

@Component({
  standalone: true, // Marking this component as standalone
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [UserFormComponent, UserListComponent], // Importing other components here
})
export class AppComponent {
  title = 'Your App Title';
}