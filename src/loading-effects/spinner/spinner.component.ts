import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="container">
      <h1>Spinner Loading Effect</h1>
      <p class="description">Animated loading spinner with gradient effect</p>
      <div class="demo">
        <div class="spinner">
          <div class="spinner-inner"></div>
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
    }

    .spinner {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      padding: 3px;
      background: conic-gradient(
        from 0deg,
        #0000,
        #7000ff
      );
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - 3px),
        #000 0
      );
      animation: rotate 1.5s infinite linear;
    }

    .spinner-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #f8f9fa;
    }

    @keyframes rotate {
      to {
        transform: rotate(1turn);
      }
    }
  `]
})
export class SpinnerComponent {} 