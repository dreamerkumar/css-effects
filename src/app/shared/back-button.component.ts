import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="back-button" (click)="goBack()">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
      </svg>
      <span>{{ text }}</span>
    </button>
  `,
  styles: [`
    .back-button {
      position: fixed;
      top: 76px;
      left: 24px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      border: none;
      border-radius: 8px;
      color: #666;
      font-family: var(--font-primary);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 100;
    }

    .back-button:hover {
      transform: translateX(-4px);
      color: #7000ff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    svg {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 768px) {
      .back-button {
        top: 72px;
        left: 16px;
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  `]
})
export class BackButtonComponent {
  @Input() path: string = '/';
  @Input() text: string = 'Back';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate([this.path]);
  }
} 