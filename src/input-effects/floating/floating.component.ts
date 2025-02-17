import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-floating',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, FormsModule],
  template: `
    <app-back-button [text]="'Back to Input Effects'" path="/input-effects"></app-back-button>
    <div class="container">
      <h1>Floating Label Effect</h1>
      <p class="description">Input field with smoothly floating label animation</p>
      <div class="demo">
        <div class="form-group">
          <input type="text" 
                 id="name" 
                 [(ngModel)]="inputValue" 
                 required>
          <label for="name" [class.float]="inputValue">Username</label>
          <div class="bar"></div>
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

    .form-group {
      position: relative;
      width: 300px;
    }

    input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #333;
      border: none;
      border-bottom: 1px solid #ddd;
      outline: none;
      background: transparent;
      transition: border-color 0.2s;
    }

    label {
      position: absolute;
      top: 10px;
      left: 0;
      font-size: 16px;
      color: #999;
      pointer-events: none;
      transition: 0.2s ease all;
    }

    input:focus ~ label,
    label.float {
      top: -20px;
      font-size: 14px;
      color: #7000ff;
    }

    .bar {
      position: relative;
      display: block;
      width: 100%;
    }

    .bar:before, .bar:after {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      position: absolute;
      background: #7000ff;
      transition: 0.2s ease all;
    }

    .bar:before { left: 50%; }
    .bar:after { right: 50%; }

    input:focus ~ .bar:before,
    input:focus ~ .bar:after {
      width: 50%;
    }

    input:focus {
      border-bottom-color: transparent;
    }
  `]
})
export class FloatingComponent {
  inputValue = '';
} 