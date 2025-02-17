import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-morph',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Transform Effects'" path="/transform-effects"></app-back-button>
    <div class="container">
      <h1>Shape Morphing Effect</h1>
      <p class="description">Smooth transitions between different shapes</p>
      <div class="demo">
        <div class="morph-grid">
          <div class="morph-box circle-to-square">
            <h3>Circle to Square</h3>
            <p>Hover to transform</p>
          </div>
          <div class="morph-box triangle-to-circle">
            <h3>Triangle to Circle</h3>
            <p>Hover to transform</p>
          </div>
          <div class="morph-box star-to-polygon">
            <h3>Star to Polygon</h3>
            <p>Hover to transform</p>
          </div>
          <div class="morph-box rectangle-to-circle">
            <h3>Rectangle to Circle</h3>
            <p>Hover to transform</p>
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

    .morph-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .morph-box {
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      position: relative;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .circle-to-square {
      background: linear-gradient(135deg, #ff3366, #ba265d);
      border-radius: 50%;
    }

    .circle-to-square:hover {
      border-radius: 8px;
    }

    .triangle-to-circle {
      background: linear-gradient(135deg, #00b4db, #0083b0);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    .triangle-to-circle:hover {
      clip-path: circle(50% at 50% 50%);
    }

    .star-to-polygon {
      background: linear-gradient(135deg, #7c4dff, #5c00d2);
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .star-to-polygon:hover {
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    }

    .rectangle-to-circle {
      background: linear-gradient(135deg, #00c853, #009624);
      border-radius: 8px;
      transform: scaleX(1.5);
    }

    .rectangle-to-circle:hover {
      border-radius: 50%;
      transform: scale(1);
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      z-index: 1;
    }

    p {
      margin: 0;
      opacity: 0.8;
      z-index: 1;
    }
  `]
})
export class MorphComponent {} 