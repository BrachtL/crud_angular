// src/app/app.routes.ts
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent, canActivate: [AuthGuard] }, // Guard the main app route
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = provideRouter(routes);