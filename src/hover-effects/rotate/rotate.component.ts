import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-rotate',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Hover Effects'" path="/hover-effects"></app-back-button>
    <div class="container">
      <h1>Rotate Hover Effect</h1>
      <p class="description">Elements with 3D rotation animations on hover</p>
      <div class="demo">
        <div class="grid">
          <div class="card flip-x">
            <div class="content">
              <h3>Flip X</h3>
              <p>Horizontal rotation</p>
            </div>
          </div>
          <div class="card flip-y">
            <div class="content">
              <h3>Flip Y</h3>
              <p>Vertical rotation</p>
            </div>
          </div>
          <div class="card flip-diagonal">
            <div class="content">
              <h3>Diagonal</h3>
              <p>Combined rotation</p>
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
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }

    .content {
      color: white;
      text-align: center;
      backface-visibility: hidden;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }

    .flip-x:hover {
      transform: rotateX(180deg);
    }

    .flip-y:hover {
      transform: rotateY(180deg);
    }

    .flip-diagonal:hover {
      transform: rotate3d(1, 1, 0, 180deg);
    }

    .card::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.1);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .card:hover::after {
      opacity: 1;
    }
  `]
})
export class RotateComponent {} 