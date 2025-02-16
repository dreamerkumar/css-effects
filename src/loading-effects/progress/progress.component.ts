import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  template: `
    <div class="container">
      <h1>Progress Loading Effect</h1>
      <p class="description">Linear progress bar with smooth animation</p>
      <div class="demo">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-bar striped">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-bar indeterminate">
            <div class="progress-fill"></div>
          </div>
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

    .progress-container {
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .progress-bar {
      height: 8px;
      background: #e2e5e7;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #7000ff;
      width: 75%;
      animation: fill 2s ease-in-out infinite;
    }

    .striped .progress-fill {
      background-image: linear-gradient(
        45deg,
        rgba(255,255,255,0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255,255,255,0.15) 50%,
        rgba(255,255,255,0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
      animation: fill 2s ease-in-out infinite,
                stripe 1s linear infinite;
    }

    .indeterminate .progress-fill {
      width: 50%;
      animation: indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes fill {
      0% { width: 0; }
      50% { width: 75%; }
      100% { width: 0; }
    }

    @keyframes stripe {
      0% { background-position: 0 0; }
      100% { background-position: 1rem 0; }
    }

    @keyframes indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(200%);
      }
    }
  `]
})
export class ProgressComponent {} 