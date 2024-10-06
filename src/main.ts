// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; 
import { provideHttpClient } from '@angular/common/http'; 
import { provideRouter } from '@angular/router'; 
import { routes } from './app/app.routes'; 
import { environment } from './environment'; 

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideRouter(routes) 
  ],
})
  .catch(err => console.error(err));
