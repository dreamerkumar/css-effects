import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-tilt',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Hover Effects'" path="/hover-effects"></app-back-button>
    <div class="container">
      <h1>Tilt Hover Effect</h1>
      <p class="description">Elements that tilt based on mouse position</p>
      <div class="demo">
        <div class="grid">
          <div class="card" #tiltCard1 (mousemove)="handleTilt($event, tiltCard1)" (mouseleave)="resetTilt(tiltCard1)">
            <div class="content">
              <h3>Tilt Effect</h3>
              <p>Basic tilt</p>
            </div>
          </div>
          <div class="card glare" #tiltCard2 (mousemove)="handleTilt($event, tiltCard2)" (mouseleave)="resetTilt(tiltCard2)">
            <div class="content">
              <h3>With Glare</h3>
              <p>Light reflection</p>
            </div>
            <div class="glare-effect"></div>
          </div>
          <div class="card parallax" #tiltCard3 (mousemove)="handleTilt($event, tiltCard3)" (mouseleave)="resetTilt(tiltCard3)">
            <div class="content">
              <h3>Parallax</h3>
              <p>Layered movement</p>
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
      perspective: 1000px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1000px;
    }

    .card {
      height: 200px;
      background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.1s ease;
    }

    .content {
      color: white;
      text-align: center;
      transform: translateZ(20px);
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }

    .glare .glare-effect {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(
        125deg,
        rgba(255,255,255, 0.3) 0%,
        rgba(255,255,255, 0) 60%
      );
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }

    .glare:hover .glare-effect {
      opacity: 1;
    }

    .parallax .content {
      transform: translateZ(40px);
    }
  `]
})
export class TiltComponent {
  handleTilt(e: MouseEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  resetTilt(element: HTMLElement) {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  }
} 