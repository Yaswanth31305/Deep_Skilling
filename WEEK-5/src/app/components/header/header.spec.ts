import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept @Input pageTitle', () => {
    component.pageTitle = 'Test Portal Title';
    fixture.detectChanges();
    expect(component.pageTitle).toBe('Test Portal Title');
  });

  it('should emit navChange @Output on nav click', () => {
    let emittedRoute = '';
    component.navChange.subscribe((route: string) => emittedRoute = route);
    component.onNavClick('/courses');
    expect(emittedRoute).toBe('/courses');
  });

  it('should have 4 nav items', () => {
    expect(component.navItems.length).toBe(4);
  });

  it('should toggle menu open/close', () => {
    expect(component.menuOpen()).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen()).toBe(false);
  });

  it('should close menu on nav click', () => {
    component.menuOpen.set(true);
    component.onNavClick('/');
    expect(component.menuOpen()).toBe(false);
  });
});
