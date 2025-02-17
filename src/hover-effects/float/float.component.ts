import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-float',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Hover Effects'" path="/hover-effects"></app-back-button>
    <div class="container">
      <h1>Float Hover Effect</h1>
      <p class="description">Elements with floating animations on hover</p>
      <div class="demo">
        <div class="grid">
          <div class="card float-up">
            <div class="content">
              <h3>Float Up</h3>
              <p>Simple float animation</p>
            </div>
          </div>
          <div class="card float-shadow">
            <div class="content">
              <h3>With Shadow</h3>
              <p>Float with shadow effect</p>
            </div>
          </div>
          <div class="card float-pulse">
            <div class="content">
              <h3>Pulse Float</h3>
              <p>Continuous animation</p>
            </div>
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

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1000px;
    }

    .card {
      height: 200px;
      background: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .content {
      text-align: center;
    }

    h3 {
      margin: 0 0 0.5rem;
      color: #333;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      color: #666;
    }

    .float-up:hover {
      transform: translateY(-10px);
    }

    .float-shadow:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1),
                 0 10px 10px -5px rgba(0,0,0,0.04);
    }

    .float-pulse {
      animation: none;
    }

    .float-pulse:hover {
      animation: float 2s ease-in-out infinite;
    }

    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }
  `]
})
export class FloatComponent {} 