// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Import AppComponent
import { appConfig } from './app/app.config'; // Import the appConfig for standalone component support

// Uncomment this if you have an environment file
/*
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
*/

// Use bootstrapApplication instead of platformBrowserDynamic
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));