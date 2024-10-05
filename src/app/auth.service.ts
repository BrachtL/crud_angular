// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named import

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // NestJS backend

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    console.log('Attempting to login with:', email); // Debug log
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        console.log('Login response:', response); // Debug log
        if (response && response.access_token) {
          this.cookieService.set('authorization', response.access_token); // Store JWT in cookies
        }
        return response; // Return the full response
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('authorization');
    if (!token) return false; // If no token, user is not authenticated

    try {
      const decodedToken: any = jwtDecode(token);
      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) { // Token is expired
        this.logout(); // Remove the token and redirect to login
        return false; // User is not authenticated
      }
      return true; // Token is valid
    } catch (error) {
      this.logout(); // Token is invalid; remove it
      return false; // User is not authenticated
    }
  }

  logout(): void {
    this.cookieService.delete('authorization'); // Remove token
    this.router.navigate(['/login']); // Redirect to login page
  }
}


