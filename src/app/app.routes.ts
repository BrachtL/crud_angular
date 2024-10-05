// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'add-user', component: UserFormComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];