import { Component } from '@angular/core';

@Component({
  selector: 'app-ripple',
  standalone: true,
  template: `
    <div class="container">
      <h1>Ripple Button Effect</h1>
      <p class="description">Material-style ripple animation on click</p>
      <div class="demo">
        <button class="ripple-button" (click)="createRipple($event)">
          Click Me
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

    .ripple-button {
      position: relative;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      color: white;
      background: #2196F3;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      transition: background 0.3s;
    }

    .ripple-button:hover {
      background: #1976D2;
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `]
})
export class RippleComponent {
  createRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    // Remove existing ripples
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
} 