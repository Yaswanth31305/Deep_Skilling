// Root App Component
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // HO2: @Input property to pass to Header
  portalTitle = 'Student Course Portal';

  // HO2: Handler for @Output event from Header
  onNavChange(route: string): void {
    console.log('[App] Navigation changed to:', route);
  }
}
