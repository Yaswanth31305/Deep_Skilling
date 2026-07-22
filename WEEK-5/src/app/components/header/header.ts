import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  @Input() pageTitle: string = 'Student Course Portal';

  @Output() navChange = new EventEmitter<string>();

  private router = inject(Router);
  authService = inject(AuthService);

  menuOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/', icon: '🏠' },
    { label: 'Courses', route: '/courses', icon: '📚' },
    { label: 'Profile', route: '/profile', icon: '👤' },
    { label: 'Register', route: '/register', icon: '✍️' },
  ];

  ngOnInit() {

    if (!this.authService.isLoggedIn()) {
      this.authService.login({
        id: 1, name: 'Yaswanth Reddy', email: 'yaswanth@college.edu',
        department: 'Computer Science', year: 3, phone: '+91-9876543210',
        enrolledCourses: [1, 2, 4], joinedDate: '2022-08-15', gpa: 8.7, avatar: ''
      });
    }
  }

  onNavClick(route: string): void {
    this.navChange.emit(route);
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/register']);
  }
}
