import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-shadow',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Text Effects'" path="/text-effects"></app-back-button>
    <div class="container">
      <h1>3D Shadow Text Effect</h1>
      <p class="description">Text with dynamic 3D shadow effect and hover animation</p>
      <div class="demo">
        <div class="shadow-text">DEPTH</div>
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
      background: #1a1a1a;
      padding: 4rem;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .shadow-text {
      font-size: 5rem;
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
      text-shadow: 
        1px 1px 1px #919191,
        1px 2px 1px #919191,
        1px 3px 1px #919191,
        1px 4px 1px #919191,
        1px 5px 1px #919191,
        1px 6px 1px #919191,
        1px 7px 1px #919191,
        1px 8px 1px #919191,
        1px 9px 1px #919191,
        1px 10px 1px #919191,
        1px 18px 6px rgba(16,16,16,0.4),
        1px 22px 10px rgba(16,16,16,0.2),
        1px 25px 35px rgba(16,16,16,0.2),
        1px 30px 60px rgba(16,16,16,0.4);
      transition: transform 0.3s ease;
    }

    .shadow-text:hover {
      transform: scale(1.1) rotate(-2deg);
    }
  `]
})
export class ShadowComponent {} 