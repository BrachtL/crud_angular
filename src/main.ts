// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; 
import { provideHttpClient } from '@angular/common/http'; 
import { provideRouter } from '@angular/router'; // Import provideRouter
import { routes } from './app/app.routes'; // Import your routes

// Uncomment this if you have an environment file
/*
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
*/

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideRouter(routes) // Provide your router configuration
  ],
})
  .catch(err => console.error(err));