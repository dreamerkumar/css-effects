import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-pulse',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Loading Effects'" path="/loading-effects"></app-back-button>
    <div class="container">
      <h1>Pulse Loading Effect</h1>
      <p class="description">Content placeholder with pulsing animation</p>
      <div class="demo">
        <div class="pulse-container">
          <div class="pulse-item">
            <div class="pulse-avatar"></div>
            <div class="pulse-content">
              <div class="pulse-line"></div>
              <div class="pulse-line short"></div>
            </div>
          </div>
          <div class="pulse-item">
            <div class="pulse-avatar"></div>
            <div class="pulse-content">
              <div class="pulse-line"></div>
              <div class="pulse-line short"></div>
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

    .pulse-container {
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .pulse-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .pulse-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #e2e5e7;
      animation: pulse 1.5s ease-in-out infinite;
    }

    .pulse-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-top: 0.5rem;
    }

    .pulse-line {
      height: 12px;
      background: #e2e5e7;
      border-radius: 4px;
      animation: pulse 1.5s ease-in-out infinite;
    }

    .pulse-line.short {
      width: 60%;
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 1;
      }
    }
  `]
})
export class PulseComponent {} 