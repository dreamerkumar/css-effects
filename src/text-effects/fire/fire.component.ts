import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-fire',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Text Effects'" path="/text-effects"></app-back-button>
    <div class="container">
      <h1>Fire Text Effect</h1>
      <p class="description">Text that appears to be burning with animated flames</p>
      <div class="demo">
        <div class="fire-text">FLAMES</div>
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

    .fire-text {
      font-size: 5rem;
      font-weight: bold;
      color: #fff;
      position: relative;
      text-shadow: 0 0 10px #fff,
                   0 -10px 20px #ff0,
                   0 -20px 40px #ff8000,
                   0 -30px 60px #f00;
      animation: burn 1s ease-in-out infinite alternate;
    }

    .fire-text::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, 
        rgba(255,0,0,0) 0%,
        rgba(255,128,0,0.3) 50%,
        rgba(255,255,0,0.3) 100%);
      filter: blur(5px);
      animation: flame 2s ease-in-out infinite;
      transform-origin: bottom;
    }

    @keyframes burn {
      from {
        text-shadow: 0 0 10px #fff,
                     0 -10px 20px #ff0,
                     0 -20px 40px #ff8000,
                     0 -30px 60px #f00;
      }
      to {
        text-shadow: 0 0 5px #fff,
                     0 -5px 10px #ff0,
                     0 -10px 20px #ff8000,
                     0 -15px 30px #f00;
      }
    }

    @keyframes flame {
      0%, 100% {
        transform: scaleY(1);
      }
      50% {
        transform: scaleY(1.2);
      }
    }
  `]
})
export class FireComponent {} 