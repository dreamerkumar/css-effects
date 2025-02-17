import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-neon',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Text Effects'" path="/text-effects"></app-back-button>
    <div class="container">
      <h1>Neon Text Effect</h1>
      <p class="description">A glowing neon text effect created using CSS text-shadow and animation</p>
      <div class="demo">
        <span class="neon-text">Glowing Neon</span>
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

    .neon-text {
      font-size: 4rem;
      font-weight: bold;
      color: #fff;
      text-shadow: 
        0 0 7px #fff,
        0 0 10px #fff,
        0 0 21px #fff,
        0 0 42px #0fa,
        0 0 82px #0fa,
        0 0 92px #0fa,
        0 0 102px #0fa,
        0 0 151px #0fa;
      animation: flicker 1.5s infinite alternate;
    }

    @keyframes flicker {
      0%, 18%, 22%, 25%, 53%, 57%, 100% {
        text-shadow: 
          0 0 7px #fff,
          0 0 10px #fff,
          0 0 21px #fff,
          0 0 42px #0fa,
          0 0 82px #0fa,
          0 0 92px #0fa,
          0 0 102px #0fa,
          0 0 151px #0fa;
      }
      20%, 24%, 55% {       
        text-shadow: none;
      }
    }
  `]
})
export class NeonComponent {} 