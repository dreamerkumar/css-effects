import { Component } from '@angular/core';

@Component({
  selector: 'app-wave',
  standalone: true,
  template: `
    <div class="container">
      <h1>Wave Text Effect</h1>
      <p class="description">Text animation that creates a wave-like motion effect</p>
      <div class="demo">
        <div class="wave">
          <span style="--i:1">W</span>
          <span style="--i:2">a</span>
          <span style="--i:3">v</span>
          <span style="--i:4">e</span>
          <span style="--i:5">s</span>
        </div>
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

    .wave {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .wave span {
      font-size: 4rem;
      font-weight: bold;
      color: #fff;
      animation: wave 2s ease-in-out infinite;
      animation-delay: calc(0.1s * var(--i));
    }

    @keyframes wave {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  `]
})
export class WaveComponent {} 