import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-elastic',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Transform Effects'" path="/transform-effects"></app-back-button>
    <div class="container">
      <h1>Elastic Transform Effect</h1>
      <p class="description">Spring and bounce animations</p>
      <div class="demo">
        <div class="elastic-grid">
          <div class="elastic-box squeeze">
            <div class="content">
              <h3>Squeeze</h3>
              <p>Hover to compress</p>
            </div>
          </div>
          <div class="elastic-box bounce">
            <div class="content">
              <h3>Bounce</h3>
              <p>Hover to jump</p>
            </div>
          </div>
          <div class="elastic-box wobble">
            <div class="content">
              <h3>Wobble</h3>
              <p>Hover to shake</p>
            </div>
          </div>
          <div class="elastic-box jelly">
            <div class="content">
              <h3>Jelly</h3>
              <p>Hover to wiggle</p>
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

    .elastic-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .elastic-box {
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #7c4dff, #5c00d2);
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .content {
      color: white;
      text-align: center;
    }

    /* Squeeze Effect */
    .squeeze:hover {
      animation: squeeze 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes squeeze {
      0% { transform: scale(1, 1); }
      50% { transform: scale(1.2, 0.8); }
      100% { transform: scale(1, 1); }
    }

    /* Bounce Effect */
    .bounce:hover {
      animation: bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes bounce {
      0% { transform: translateY(0); }
      40% { transform: translateY(-30px); }
      60% { transform: translateY(-15px); }
      80% { transform: translateY(-5px); }
      100% { transform: translateY(0); }
    }

    /* Wobble Effect */
    .wobble:hover {
      animation: wobble 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes wobble {
      0% { transform: rotate(0); }
      25% { transform: rotate(-15deg); }
      50% { transform: rotate(10deg); }
      75% { transform: rotate(-5deg); }
      100% { transform: rotate(0); }
    }

    /* Jelly Effect */
    .jelly:hover {
      animation: jelly 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes jelly {
      0% { transform: scale(1, 1); }
      30% { transform: scale(1.25, 0.75); }
      40% { transform: scale(0.75, 1.25); }
      50% { transform: scale(1.15, 0.85); }
      65% { transform: scale(0.95, 1.05); }
      75% { transform: scale(1.05, 0.95); }
      100% { transform: scale(1, 1); }
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
export class ElasticComponent {} 