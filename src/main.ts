// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; 
import { provideHttpClient } from '@angular/common/http'; 


// Uncomment this if you have an environment file
/*
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
*/

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideHttpClient()],
})
  .catch(err => console.error(err));