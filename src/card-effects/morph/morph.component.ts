import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-morph',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Card Effects'" path="/card-effects"></app-back-button>
    <div class="container">
      <h1>Morph Card Effect</h1>
      <p class="description">Shape-shifting card with smooth morphing animations</p>
      <div class="demo">
        <div class="card">
          <div class="morph-shape"></div>
          <div class="content">
            <h2>Morph</h2>
            <p>Watch me transform</p>
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
    }

    .card {
      width: 300px;
      height: 200px;
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
    }

    .morph-shape {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      animation: morph 8s ease-in-out infinite;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 2rem;
      font-weight: 500;
    }

    p {
      margin: 0;
      font-size: 1rem;
      opacity: 0.8;
    }

    @keyframes morph {
      0%, 100% {
        border-radius: 16px;
        transform: rotate(0deg);
      }
      25% {
        border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
        transform: rotate(5deg);
      }
      50% {
        border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
        transform: rotate(-5deg);
      }
      75% {
        border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
        transform: rotate(5deg);
      }
    }

    .card:hover .morph-shape {
      animation-play-state: paused;
    }
  `]
})
export class MorphComponent {} 