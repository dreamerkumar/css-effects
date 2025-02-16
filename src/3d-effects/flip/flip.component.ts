import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>3D Flip Effect</h1>
      <p class="description">Smooth 3D card flip animations</p>
      <div class="demo">
        <div class="controls">
          <select (change)="changeAxis($event)">
            <option value="Y">Flip Y</option>
            <option value="X">Flip X</option>
          </select>
          <button (click)="toggleFlip()">Flip Card</button>
        </div>
        <div class="cards-container">
          <div class="card" 
               [class.flipped]="isFlipped"
               [style.transform]="cardTransform">
            <div class="card-face front">
              <h2>Front</h2>
              <p>Hover or click to flip</p>
              <div class="card-content">
                <div class="icon">🎮</div>
                <h3>Gaming</h3>
                <p>Experience immersive 3D effects</p>
              </div>
            </div>
            <div class="card-face back">
              <h2>Back</h2>
              <p>Hover or click to flip back</p>
              <div class="card-content">
                <div class="icon">🎨</div>
                <h3>Design</h3>
                <p>Smooth transitions and animations</p>
              </div>
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
      padding: 2rem;
      background: #1a1a1a;
      border-radius: 8px;
    }

    .controls {
      margin-bottom: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }

    button, select {
      padding: 0.5rem 1.5rem;
      background: #7c4dff;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover, select:hover {
      background: #6c3fff;
    }

    select {
      background: #5c00d2;
    }

    .cards-container {
      perspective: 1000px;
      padding: 2rem;
    }

    .card {
      width: 300px;
      height: 400px;
      margin: 0 auto;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
    }

    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 2rem;
      border-radius: 12px;
      background: #2a2a2a;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }

    .front {
      transform: rotateY(0deg);
      background: linear-gradient(135deg, #7c4dff, #448aff);
    }

    .back {
      transform: rotateY(180deg);
      background: linear-gradient(135deg, #ff4081, #7c4dff);
    }

    .card.flipped {
      transform: rotateY(180deg);
    }

    .card-content {
      text-align: center;
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h2 {
      color: white;
      margin: 0;
      font-size: 1.5rem;
    }

    h3 {
      color: white;
      margin: 0.5rem 0;
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }

    @media (hover: hover) {
      .card:hover {
        transform: rotateY(180deg);
      }
    }
  `]
})
export class FlipComponent {
  isFlipped = false;
  flipAxis: 'X' | 'Y' = 'Y';

  get cardTransform(): string {
    if (!this.isFlipped) return '';
    return `rotate${this.flipAxis}(180deg)`;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  changeAxis(event: Event) {
    this.flipAxis = (event.target as HTMLSelectElement).value as 'X' | 'Y';
    this.isFlipped = false;
  }
} 