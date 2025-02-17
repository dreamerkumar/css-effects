import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-fold',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Transform Effects'" path="/transform-effects"></app-back-button>
    <div class="container">
      <h1>Fold Transform Effect</h1>
      <p class="description">Origami-style folding animations</p>
      <div class="demo">
        <div class="fold-grid">
          <div class="fold-box vertical-fold">
            <div class="front">
              <h3>Vertical Fold</h3>
              <p>Hover to unfold</p>
            </div>
            <div class="back">
              <h3>Back Side</h3>
              <p>Content revealed</p>
            </div>
          </div>
          <div class="fold-box horizontal-fold">
            <div class="front">
              <h3>Horizontal Fold</h3>
              <p>Hover to unfold</p>
            </div>
            <div class="back">
              <h3>Back Side</h3>
              <p>Content revealed</p>
            </div>
          </div>
          <div class="fold-box diagonal-fold">
            <div class="front">
              <h3>Diagonal Fold</h3>
              <p>Hover to unfold</p>
            </div>
            <div class="back">
              <h3>Back Side</h3>
              <p>Content revealed</p>
            </div>
          </div>
          <div class="fold-box multi-fold">
            <div class="front">
              <h3>Multi Fold</h3>
              <p>Hover to unfold</p>
            </div>
            <div class="back">
              <h3>Back Side</h3>
              <p>Content revealed</p>
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
      background: #f8f9fa;
      border-radius: 8px;
    }

    .fold-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .fold-box {
      height: 300px;
      position: relative;
      perspective: 1000px;
      cursor: pointer;
    }

    .front, .back {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      backface-visibility: hidden;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(135deg, #7c4dff, #5c00d2);
      color: white;
      border-radius: 8px;
    }

    .back {
      background: linear-gradient(135deg, #5c00d2, #3700b3);
    }

    /* Vertical Fold */
    .vertical-fold .back {
      transform: rotateY(180deg);
    }

    .vertical-fold:hover .front {
      transform: rotateY(180deg);
    }

    .vertical-fold:hover .back {
      transform: rotateY(360deg);
    }

    /* Horizontal Fold */
    .horizontal-fold .back {
      transform: rotateX(180deg);
    }

    .horizontal-fold:hover .front {
      transform: rotateX(180deg);
    }

    .horizontal-fold:hover .back {
      transform: rotateX(360deg);
    }

    /* Diagonal Fold */
    .diagonal-fold .back {
      transform: rotate3d(1, 1, 0, 180deg);
    }

    .diagonal-fold:hover .front {
      transform: rotate3d(1, 1, 0, 180deg);
    }

    .diagonal-fold:hover .back {
      transform: rotate3d(1, 1, 0, 360deg);
    }

    /* Multi Fold */
    .multi-fold .front {
      transform-origin: left center;
    }

    .multi-fold .back {
      transform: rotateY(180deg);
      transform-origin: right center;
    }

    .multi-fold:hover .front {
      transform: rotateY(-120deg);
    }

    .multi-fold:hover .back {
      transform: rotateY(60deg);
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }
  `]
})
export class FoldComponent {} 