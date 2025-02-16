import { Component } from '@angular/core';

@Component({
  selector: 'app-pulse',
  standalone: true,
  template: `
    <div class="container">
      <h1>Pulse Button Effect</h1>
      <p class="description">Button with smooth pulsing animation and hover effect</p>
      <div class="demo">
        <button class="pulse-button">
          Click Me
          <div class="pulse-ring"></div>
        </button>
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

    .pulse-button {
      position: relative;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      color: white;
      background: #4CAF50;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .pulse-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(76, 175, 80, 0.3);
    }

    .pulse-button:active {
      transform: translateY(0);
    }

    .pulse-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(76, 175, 80, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
      }
    }
  `]
})
export class PulseComponent {} 