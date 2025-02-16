import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-magnetic',
  standalone: true,
  template: `
    <div class="container">
      <h1>Magnetic Cursor Effect</h1>
      <p class="description">Elements that attract the cursor</p>
      <div class="demo">
        <div class="magnetic-grid">
          <button 
            class="magnetic-button"
            *ngFor="let i of [1,2,3,4]"
            (mousemove)="handleMagneticMove($event)"
            (mouseleave)="handleMagneticLeave($event)">
            Magnetic {{i}}
          </button>
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
      background: #f8f9fa;
      border-radius: 8px;
    }

    .magnetic-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .magnetic-button {
      padding: 1.5rem 3rem;
      border: none;
      border-radius: 8px;
      background: #7000ff;
      color: white;
      font-size: 1.1rem;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    .magnetic-button:hover {
      background: #5c00d2;
    }
  `],
  imports: [CommonModule]
})
export class MagneticComponent {
  handleMagneticMove(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) * 0.2;
    const deltaY = (y - centerY) * 0.2;

    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  handleMagneticLeave(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    button.style.transform = 'translate(0, 0)';
  }
} 