// HO6 — Auth Service: manages logged-in student session
import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'scp_user';

  // Signal for reactive auth state
  currentUser = signal<Student | null>(this.loadFromStorage());

  private loadFromStorage(): Student | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  login(student: Student): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(student));
    this.currentUser.set(student);
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentStudent(): Student | null {
    return this.currentUser();
  }
}
