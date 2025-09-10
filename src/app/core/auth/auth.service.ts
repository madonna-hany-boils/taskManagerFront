import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

interface LoginDto { email: string; password: string; }
interface RegisterDto { username: string; email: string; password: string; }
interface LoginResponse { token: string; }


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  login(dto: LoginDto) {
    return this.http.post<LoginResponse>('http://taskymanager.runasp.net/api/Auth/login', dto)
      .pipe(
        tap(res => {
          if (res && res.token) this.setToken(res.token);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.unique_name || payload.sub || null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  // ✅ هنا الدالة يجب أن تكون داخل الكلاس
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Number(payload.sub) || null; // sub يمثل userId
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
