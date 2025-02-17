import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-underline',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, FormsModule],
  template: `
    <app-back-button [text]="'Back to Input Effects'" path="/input-effects"></app-back-button>
    <div class="container">
      <h1>Underline Input Effect</h1>
      <p class="description">Input field with animated underline effect</p>
      <div class="demo">
        <div class="input-group">
          <input type="text" 
                 [(ngModel)]="inputValue" 
                 required>
          <span class="highlight"></span>
          <span class="underline"></span>
          <label>Enter Text</label>
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
      margin: 0 auto;
    }

    input {
      font-size: 18px;
      padding: 10px 10px 10px 5px;
      display: block;
      width: 100%;
      border: none;
      background: transparent;
      border-bottom: 1px solid #757575;
    }

    input:focus {
      outline: none;
    }

    label {
      color: #999;
      font-size: 18px;
      font-weight: normal;
      position: absolute;
      pointer-events: none;
      left: 5px;
      top: 10px;
      transition: 0.2s ease all;
    }

    input:focus ~ label, input:valid ~ label {
      top: -20px;
      font-size: 14px;
      color: #5264AE;
    }

    .underline {
      position: relative;
      display: block;
      width: 100%;
    }

    .underline:before {
      content: '';
      height: 2px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #5264AE;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    input:focus ~ .underline:before {
      transform: scaleX(1);
    }

    .highlight {
      position: absolute;
      height: 60%;
      width: 100px;
      top: 25%;
      left: 0;
      pointer-events: none;
      opacity: 0.5;
      background: linear-gradient(
        to right,
        transparent,
        rgba(82,100,174,0.1),
        transparent
      );
      transform: translateX(-100%);
    }

    input:focus ~ .highlight {
      animation: slide 0.5s ease;
    }

    @keyframes slide {
      100% {
        transform: translateX(100%);
      }
    }
  `]
})
export class UnderlineComponent {
  inputValue = '';
} 