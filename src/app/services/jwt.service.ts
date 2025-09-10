// src/app/services/jwt.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = atob(token.split('.')[1]); // 👈 decode Base64
      return JSON.parse(payload);
    } catch (error) {
      console.error('❌ Error decoding token', error);
      return null;
    }
  }

  getUserId(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.nameid || decoded.sub || null : null; 
    // 👆 حسب الـ claim اللي بترجعه API (ممكن تكون nameid, sub, userId ... إلخ)
  }
}
