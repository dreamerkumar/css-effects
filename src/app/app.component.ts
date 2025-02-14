import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/text-effects/neon">Neon</a>
      <a routerLink="/text-effects/gradient">Gradient</a>
      <a routerLink="/text-effects/glitch">Glitch</a>
      <a routerLink="/text-effects/wave">Wave</a>
      <a routerLink="/text-effects/typing">Typing</a>
      <a routerLink="/text-effects/shadow">Shadow</a>
      <a routerLink="/text-effects/reveal">Reveal</a>
      <a routerLink="/text-effects/rainbow">Rainbow</a>
      <a routerLink="/text-effects/fire">Fire</a>
      <a routerLink="/text-effects/matrix">Matrix</a>
    </nav>
    <router-outlet />
  `,
  styles: [`
    nav {
      padding: 1rem;
      background: #f8f9fa;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    a {
      text-decoration: none;
      color: #333;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    a:hover {
      background-color: #e9ecef;
    }
  `]
})
export class AppComponent {
  title = 'css-effects';
}
