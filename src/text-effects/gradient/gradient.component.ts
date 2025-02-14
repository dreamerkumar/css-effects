import { Component } from '@angular/core';

@Component({
  selector: 'app-gradient',
  standalone: true,
  template: `
    <div class="container">
      <h1>Gradient Text Effect</h1>
      <p class="description">Animated gradient background with text mask effect</p>
      <div class="demo">
        <span class="gradient-text">Rainbow Flow</span>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      text-align: center;
    }

    .description {
      margin: 1rem 0 2rem;
      color: #666;
    }

    .demo {
      background: #1a1a1a;
      padding: 4rem;
      border-radius: 8px;
    }

    .gradient-text {
      font-size: 4rem;
      font-weight: bold;
      background: linear-gradient(
        to right,
        #ff0000,
        #ff7f00,
        #ffff00,
        #00ff00,
        #0000ff,
        #4b0082,
        #8b00ff,
        #ff0000
      );
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: shine 5s linear infinite;
    }

    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
  `]
})
export class GradientComponent {} 