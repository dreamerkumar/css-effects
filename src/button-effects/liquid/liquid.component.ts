import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-liquid',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Button Effects'" path="/button-effects"></app-back-button>
    <div class="container">
      <h1>Liquid Button Effect</h1>
      <p class="description">Button with liquid-like animation on hover</p>
      <div class="demo">
        <button class="liquid-button">
          <span>Hover Me</span>
          <div class="liquid"></div>
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

    .liquid-button {
      position: relative;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
    }

    .liquid-button span {
      position: relative;
      z-index: 1;
      color: #fff;
      letter-spacing: 8px;
      text-transform: uppercase;
    }

    .liquid {
      position: absolute;
      top: -80px;
      left: 0;
      width: 200px;
      height: 200px;
      background: #4973ff;
      box-shadow: inset 0 0 50px rgba(0, 0, 0, .5);
      transition: 0.5s;
    }

    .liquid::after,
    .liquid::before {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      top: 0;
      left: 50%;
      transform: translate(-50%, -75%);
    }

    .liquid::before {
      border-radius: 45%;
      background: rgba(20, 20, 20, 1);
      animation: animate 5s linear infinite;
    }

    .liquid::after {
      border-radius: 40%;
      background: rgba(20, 20, 20, .5);
      animation: animate 10s linear infinite;
    }

    .liquid-button:hover .liquid {
      top: -120px;
    }

    @keyframes animate {
      0% {
        transform: translate(-50%, -75%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -75%) rotate(360deg);
      }
    }
  `]
})
export class LiquidComponent {} 