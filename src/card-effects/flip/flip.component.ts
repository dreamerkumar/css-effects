import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-flip',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Card Effects'" path="/card-effects"></app-back-button>
    <div class="container">
      <h1>3D Card Flip Effect</h1>
      <p class="description">Interactive card with smooth 3D flip animation on hover</p>
      <div class="demo">
        <div class="card">
          <div class="card-inner">
            <div class="card-front">
              <h2>Hover Me</h2>
              <p>See what's on the back!</p>
            </div>
            <div class="card-back">
              <h2>Hello!</h2>
              <p>This is the back of the card</p>
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
      perspective: 1000px;
    }

    .card {
      width: 300px;
      height: 200px;
      cursor: pointer;
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .card:hover .card-inner {
      transform: rotateY(180deg);
    }

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .card-front {
      background: linear-gradient(135deg, #6e8efb, #a777e3);
      color: white;
    }

    .card-back {
      background: linear-gradient(135deg, #a777e3, #6e8efb);
      color: white;
      transform: rotateY(180deg);
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      font-size: 1rem;
    }
  `]
})
export class FlipComponent {} 