import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shake',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h1>Shake Input Effect</h1>
      <p class="description">Input field with shake animation for validation</p>
      <div class="demo">
        <div class="input-group">
          <input type="text" 
                 [(ngModel)]="inputValue" 
                 [class.error]="hasError"
                 (blur)="validateInput()"
                 required>
          <label [class.float]="inputValue">Email</label>
          <div class="error-message" [class.show]="hasError">
            Please enter a valid email address
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

    .input-group {
      position: relative;
      width: 300px;
    }

    input {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      color: #333;
      background: white;
      border: 2px solid #e0e0e0;
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
    label.float {
      top: -10px;
      left: 6px;
      font-size: 14px;
      padding: 0 6px;
      background: white;
      color: #7000ff;
    }

    input:focus {
      border-color: #7000ff;
    }

    input.error {
      border-color: #ff4444;
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    .error-message {
      position: absolute;
      left: 0;
      bottom: -24px;
      color: #ff4444;
      font-size: 14px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }

    .error-message.show {
      opacity: 1;
      transform: translateY(0);
    }

    @keyframes shake {
      10%, 90% {
        transform: translateX(-1px);
      }
      20%, 80% {
        transform: translateX(2px);
      }
      30%, 50%, 70% {
        transform: translateX(-4px);
      }
      40%, 60% {
        transform: translateX(4px);
      }
    }
  `]
})
export class ShakeComponent {
  inputValue = '';
  hasError = false;

  validateInput() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.hasError = !emailRegex.test(this.inputValue);
  }
} 