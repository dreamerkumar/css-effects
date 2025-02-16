import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expand',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h1>Expand Input Effect</h1>
      <p class="description">Input field that expands on focus</p>
      <div class="demo">
        <div class="input-group">
          <input type="text" 
                 [(ngModel)]="inputValue" 
                 placeholder="Search...">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
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
      width: 200px;
      transition: width 0.3s ease;
    }

    .input-group:focus-within {
      width: 300px;
    }

    input {
      width: 100%;
      padding: 12px 40px 12px 16px;
      font-size: 16px;
      color: #333;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 25px;
      outline: none;
      transition: all 0.3s ease;
    }

    input:focus {
      border-color: #7000ff;
      box-shadow: 0 3px 8px rgba(112, 0, 255, 0.15);
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      stroke-width: 2;
      color: #666;
      pointer-events: none;
      transition: color 0.3s ease;
    }

    input:focus + .search-icon {
      color: #7000ff;
    }

    input::placeholder {
      color: #999;
      transition: opacity 0.3s ease;
    }

    input:focus::placeholder {
      opacity: 0.5;
    }
  `]
})
export class ExpandComponent {
  inputValue = '';
} 