import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-rainbow',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Text Effects'" path="/text-effects"></app-back-button>
    <div class="container">
      <h1>Rainbow Text Effect</h1>
      <p class="description">Text with animated rainbow colors and sparkle effect</p>
      <div class="demo">
        <div class="rainbow-text">RAINBOW</div>
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
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .rainbow-text {
      font-size: 4rem;
      font-weight: bold;
      background: linear-gradient(
        to right,
        #ff0000 0%,
        #ff8000 14%,
        #ffff00 28%,
        #00ff00 42%,
        #00ffff 56%,
        #0000ff 70%,
        #8000ff 84%,
        #ff0080 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: rainbow-move 8s linear infinite,
                sparkle 2s ease-in-out infinite;
      text-shadow: 0 0 10px rgba(255,255,255,0.3);
    }

    @keyframes rainbow-move {
      0% {
        background-position: 0% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    @keyframes sparkle {
      0%, 100% {
        filter: brightness(100%);
      }
      50% {
        filter: brightness(150%);
      }
    }
  `]
})
export class RainbowComponent {} 