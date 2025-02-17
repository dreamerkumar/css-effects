import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-glow',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, FormsModule],
  template: `
    <app-back-button [text]="'Back to Input Effects'" path="/input-effects"></app-back-button>
    <div class="container">
      <h1>Glow Input Effect</h1>
      <p class="description">Input field with neon glow effect on focus</p>
      <div class="demo">
        <div class="input-group">
          <input type="text" 
                 [(ngModel)]="inputValue" 
                 required>
          <label>Enter Text</label>
          <div class="glow"></div>
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
      background: #1a1a1a;
      border-radius: 8px;
    }

    .input-group {
      position: relative;
      width: 300px;
    }

    input {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      color: #fff;
      background: transparent;
      border: 2px solid #333;
      border-radius: 6px;
      outline: none;
      transition: all 0.3s ease;
    }

    label {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      color: #666;
      pointer-events: none;
      transition: 0.3s ease all;
    }

    input:focus ~ label,
    input:valid ~ label {
      top: -10px;
      left: 6px;
      font-size: 14px;
      padding: 0 6px;
      background: #1a1a1a;
      color: #00ff9f;
    }

    input:focus,
    input:valid {
      border-color: #00ff9f;
      box-shadow: 0 0 0 2px rgba(0, 255, 159, 0.1),
                 0 0 10px rgba(0, 255, 159, 0.2),
                 0 0 20px rgba(0, 255, 159, 0.1);
    }

    .glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      border-radius: 6px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    input:focus ~ .glow {
      opacity: 1;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 255, 159, 0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(0, 255, 159, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 255, 159, 0);
      }
    }
  `]
})
export class GlowComponent {
  inputValue = '';
} 