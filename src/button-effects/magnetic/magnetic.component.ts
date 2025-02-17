import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-magnetic',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Button Effects'" path="/button-effects"></app-back-button>
    <div class="container">
      <h1>Magnetic Button Effect</h1>
      <p class="description">Button that attracts the cursor with a magnetic effect</p>
      <div class="demo">
        <button #magneticButton
               class="magnetic-button"
               (mousemove)="handleMouseMove($event)"
               (mouseleave)="handleMouseLeave()">
          <span class="magnetic-content">Attract</span>
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

    .magnetic-button {
      position: relative;
      padding: 1.5rem 3rem;
      font-size: 1.1rem;
      border: none;
      background: #7000ff;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .magnetic-content {
      display: block;
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .magnetic-button:hover {
      animation: glow 2s linear infinite;
    }

    @keyframes glow {
      0% {
        box-shadow: 0 0 5px #7000ff,
                    0 0 10px #7000ff,
                    0 0 20px #7000ff;
      }
      50% {
        box-shadow: 0 0 10px #7000ff,
                    0 0 20px #7000ff,
                    0 0 40px #7000ff;
      }
      100% {
        box-shadow: 0 0 5px #7000ff,
                    0 0 10px #7000ff,
                    0 0 20px #7000ff;
      }
    }
  `]
})
export class MagneticComponent {
  @ViewChild('magneticButton') buttonRef!: ElementRef;

  handleMouseMove(e: MouseEvent) {
    const button = this.buttonRef.nativeElement;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) * 0.1;
    const deltaY = (y - centerY) * 0.1;

    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    button.querySelector('.magnetic-content').style.transform = 
      `translate(${deltaX * 1.5}px, ${deltaY * 1.5}px)`;
  }

  handleMouseLeave() {
    const button = this.buttonRef.nativeElement;
    button.style.transform = 'translate(0, 0)';
    button.querySelector('.magnetic-content').style.transform = 'translate(0, 0)';
  }
} 