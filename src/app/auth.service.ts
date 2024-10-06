import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // NestJS backend

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      map((response: any) => {
        // JWT is stored in the 'jwt' cookie, no need to store it manually
        return response; 
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('jwt'); 
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.logout(); 
        return false;
      }
      return true;
    } catch (error) {
      this.logout(); 
      return false;
    }
  }

  logout(): void {
    this.cookieService.delete('jwt'); 
    this.router.navigate(['/login']);
  }
}