import { Component } from '@angular/core';

@Component({
  selector: 'app-hover',
  standalone: true,
  template: `
    <div class="container">
      <h1>Hover Card Effect</h1>
      <p class="description">Smooth elevation and transform effects on hover</p>
      <div class="demo">
        <div class="card">
          <div class="card-content">
            <h2>Hover Me</h2>
            <p>Watch the smooth transition</p>
            <div class="shine"></div>
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
      transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .card-content {
      position: relative;
      height: 100%;
      padding: 2rem;
      background: linear-gradient(45deg, #2c3e50, #3498db);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }

    .shine {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
      transform: translateX(-100%);
    }

    .card:hover {
      transform: scale(1.04) translateY(-8px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }

    .card:hover .shine {
      transform: translateX(100%);
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      font-size: 1rem;
      opacity: 0.8;
    }
  `]
})
export class HoverComponent {} 