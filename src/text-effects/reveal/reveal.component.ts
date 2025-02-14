import { Component } from '@angular/core';

@Component({
  selector: 'app-reveal',
  standalone: true,
  template: `
    <div class="container">
      <h1>Text Reveal Effect</h1>
      <p class="description">Text that reveals itself with a sliding animation</p>
      <div class="demo">
        <div class="reveal-container">
          <div class="reveal-text">UNVEILED</div>
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

    .reveal-container {
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .reveal-text {
      font-size: 4rem;
      font-weight: bold;
      color: #fff;
      transform: translateY(100%);
      animation: reveal 1.5s ease forwards;
    }

    @keyframes reveal {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(0);
      }
    }

    .reveal-container:hover .reveal-text {
      animation: reveal-reverse 0.5s ease forwards;
    }

    @keyframes reveal-reverse {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-100%);
      }
    }
  `]
})
export class RevealComponent {} 