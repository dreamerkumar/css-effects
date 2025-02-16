import { Component } from '@angular/core';

@Component({
  selector: 'app-dots',
  standalone: true,
  template: `
    <div class="container">
      <h1>Dots Loading Effect</h1>
      <p class="description">Bouncing dots animation with staggered timing</p>
      <div class="demo">
        <div class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
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
      padding: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .dots-container {
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 20px;
      height: 20px;
      background: #7000ff;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out;
    }

    .dot:nth-child(1) {
      animation-delay: -0.32s;
    }

    .dot:nth-child(2) {
      animation-delay: -0.16s;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
  `]
})
export class DotsComponent {} 